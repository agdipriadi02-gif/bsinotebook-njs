'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import UploadModal from '@/components/UploadModal';
import { Material, ChatMessage, ChatSession } from '@/types';
import {
  getChatSessions,
  saveChatSessions,
  createNewSession,
  getActiveSessionId,
  setActiveSessionId,
} from '@/lib/chatHistory';
import {
  FileText,
  Sparkles,
  Send,
  BookOpen,
  CheckCircle2,
  Trash2,
  Plus,
  Bot,
  User,
  Clock,
} from 'lucide-react';

const MATERIALS_STORAGE_KEY = 'bsi_user_materials';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [activeMaterial, setActiveMaterial] = useState<Material | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeQuote, setActiveQuote] = useState<{ location: string; content: string } | null>(null);

  // Chat & History State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 1. Load user materials from localStorage (starts empty if none)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MATERIALS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMaterials(parsed);
          setActiveMaterial(parsed[0]);
          setActiveQuote(parsed[0].quoteSource || null);
        } else {
          setMaterials([]);
          setActiveMaterial(null);
          setActiveQuote(null);
        }
      } else {
        setMaterials([]);
        setActiveMaterial(null);
        setActiveQuote(null);
      }
    } catch {
      setMaterials([]);
    }
  }, []);

  // Save materials whenever updated
  const updateMaterialsList = (newList: Material[]) => {
    setMaterials(newList);
    try {
      localStorage.setItem(MATERIALS_STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  // 2. Load Sessions & Active Session
  const syncSessions = (targetSessionId?: string) => {
    const list = getChatSessions();
    setSessions(list);

    const querySessionId = targetSessionId || searchParams.get('session') || getActiveSessionId();
    let current = list.find((s) => s.id === querySessionId);
    if (!current) {
      if (list.length > 0) {
        current = list[0];
      } else {
        current = createNewSession(activeMaterial?.title || 'Studi Perkuliahan', activeMaterial?.id || 'mat-default');
        list.push(current);
      }
    }

    setActiveSession(current);
    setActiveSessionId(current.id);

    if (current.materialId && materials.length > 0) {
      const foundMat = materials.find((m) => m.id === current.materialId);
      if (foundMat) {
        setActiveMaterial(foundMat);
        setActiveQuote(foundMat.quoteSource || null);
      }
    }
  };

  useEffect(() => {
    syncSessions();

    const handleUpdate = () => {
      const list = getChatSessions();
      setSessions(list);
    };

    const handleActiveChange = () => {
      const activeId = getActiveSessionId();
      if (activeId) syncSessions(activeId);
    };

    window.addEventListener('bsi_chat_sessions_updated', handleUpdate);
    window.addEventListener('bsi_active_session_changed', handleActiveChange);

    return () => {
      window.removeEventListener('bsi_chat_sessions_updated', handleUpdate);
      window.removeEventListener('bsi_active_session_changed', handleActiveChange);
    };
  }, [searchParams, materials]);

  const handleSelectMaterial = (mat: Material) => {
    setActiveMaterial(mat);
    setActiveQuote(mat.quoteSource || null);

    if (activeSession) {
      const updatedMessages: ChatMessage[] = [
        ...activeSession.messages,
        {
          id: 'msg-' + Date.now(),
          role: 'assistant',
          content: `Materi aktif sekarang dialihkan ke **"${mat.title}"**. AI siap menjawab pertanyaan dan menganalisis modul ini.`,
          time: 'Baru saja',
          hasSource: !!mat.quoteSource,
          sourceText: mat.quoteSource?.content,
        },
      ];

      const updatedSession: ChatSession = {
        ...activeSession,
        materialId: mat.id,
        materialTitle: mat.title,
        updatedAt: 'Baru saja',
        messages: updatedMessages,
      };

      const updatedList = sessions.map((s) => (s.id === updatedSession.id ? updatedSession : s));
      setActiveSession(updatedSession);
      saveChatSessions(updatedList);
    }
  };

  // Add new material
  const handleUploadSuccess = (newMat: Material) => {
    const updated = [newMat, ...materials];
    updateMaterialsList(updated);
    handleSelectMaterial(newMat);
  };

  // Delete material
  const handleDeleteMaterial = (e: React.MouseEvent, materialId: string) => {
    e.stopPropagation();
    const remaining = materials.filter((m) => m.id !== materialId);
    updateMaterialsList(remaining);

    if (activeMaterial?.id === materialId) {
      if (remaining.length > 0) {
        setActiveMaterial(remaining[0]);
        setActiveQuote(remaining[0].quoteSource || null);
      } else {
        setActiveMaterial(null);
        setActiveQuote(null);
      }
    }
  };

  const handleSwitchSession = (sessionId: string) => {
    const target = sessions.find((s) => s.id === sessionId);
    if (target) {
      setActiveSession(target);
      setActiveSessionId(target.id);
      if (target.materialId) {
        const foundMat = materials.find((m) => m.id === target.materialId);
        if (foundMat) {
          setActiveMaterial(foundMat);
          setActiveQuote(foundMat.quoteSource || null);
        }
      }
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || chatInput).trim();
    if (!text || !activeSession) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text,
      time: 'Baru saja',
    };

    // Auto-update title if it is still a new chat
    const isNewTitle =
      activeSession.title === 'Percakapan Baru' || activeSession.title.startsWith('Percakapan ');
    const newTitle = isNewTitle
      ? text.length > 35
        ? text.substring(0, 32) + '...'
        : text
      : activeSession.title;

    const newMessages = [...activeSession.messages, userMsg];

    const interimSession: ChatSession = {
      ...activeSession,
      title: newTitle,
      updatedAt: 'Baru saja',
      messages: newMessages,
    };

    setActiveSession(interimSession);
    setChatInput('');
    setIsTyping(true);

    const updatedList = sessions.map((s) => (s.id === interimSession.id ? interimSession : s));
    saveChatSessions(updatedList);

    // AI Response generation logic
    setTimeout(() => {
      let aiResponse = '';
      let quote = activeMaterial?.quoteSource;

      const lower = text.toLowerCase();
      if (lower.includes('beda') || lower.includes('perbedaan') || lower.includes('machine learning')) {
        aiResponse =
          'Berdasarkan pemahaman materi, perbedaan utamanya adalah:\n\n• **Pemrograman Konvensional**: Programmer menulis kode dan aturan logika secara manual.\n• **Machine Learning**: Komputer dilatih dengan data dan jawaban agar model sendiri yang menemukan aturan dan formula polanya.';
      } else if (lower.includes('ringkas') || lower.includes('poin') || lower.includes('bab')) {
        aiResponse = activeMaterial
          ? `Berikut ringkasan esensial dari dokumen **"${activeMaterial.title}"**:\n\n1. Konsep inti berfokus pada pendalaman materi pokok perkuliahan.\n2. Pembahasan struktur teori dan studi kasus aplikatif.\n3. Rujukan telah dianalisis untuk persiapan kuis & ujian semester.`
          : 'Silakan unggah dokumen materi kuliah terlebih dahulu di sebelah kiri agar AI dapat menyusun ringkasan poin penting secara spesifik.';
      } else {
        aiResponse = activeMaterial
          ? `Berdasarkan analisis dokumen **"${activeMaterial.title}"**, konsep ini sangat relevan untuk dipelajari lebih mendalam pada materi perkuliahan Anda.`
          : `Pertanyaan Anda: "${text}". Untuk analisis yang lebih mendalam berbasis kutipan halaman dokumen, Anda dapat mengunggah modul kuliah di panel sebelah kiri.`;
      }

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        role: 'assistant',
        content: aiResponse,
        time: 'Baru saja',
        hasSource: !!quote,
        sourceText: quote?.content,
      };

      const finalMessages = [...newMessages, aiMsg];
      const finalSession: ChatSession = {
        ...interimSession,
        messages: finalMessages,
      };

      setActiveSession(finalSession);
      const finalList = sessions.map((s) => (s.id === finalSession.id ? finalSession : s));
      saveChatSessions(finalList);
      setIsTyping(false);
    }, 850);
  };

  const messages = activeSession?.messages || [];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/90 to-emerald-50/25 font-sans text-slate-800">
      {/* Reusable Sidebar */}
      <Sidebar
        onUploadClick={() => setIsUploadOpen(true)}
        onSelectSession={handleSwitchSession}
      />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Notebook Baru"
          contextText={activeMaterial ? `Materi: ${activeMaterial.title}` : 'Belum Ada Materi Terpilih'}
        />

        {/* 3-Column Responsive Dashboard Layout */}
        <div className="flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* KOLOM 1 (KIRI - 3 COLS): KOLEKSI MATERI */}
          <div className="lg:col-span-3 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Koleksi Materi
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/80 px-2.5 py-0.5 rounded-full">
                {materials.length} File
              </span>
            </div>

            {/* Quick Upload Button (Tambah Materi) */}
            <button
              onClick={() => setIsUploadOpen(true)}
              type="button"
              className="w-full border-2 border-dashed border-emerald-500/40 hover:border-emerald-600 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-2xl p-3 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-2xs"
            >
              <Plus className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              Unggah Materi Baru
            </button>

            {/* Material List with Add/Delete support */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {materials.length === 0 ? (
                <div className="text-center py-9 px-3 rounded-2xl border-2 border-dashed border-slate-200/80 bg-slate-50/50 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="text-xs font-bold text-slate-700">Belum Ada Materi</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-[190px] mx-auto">
                    Klik tombol di atas untuk menambahkan dokumen PDF, Word, atau teks perkuliahan.
                  </p>
                </div>
              ) : (
                materials.map((mat) => {
                  const isSelected = activeMaterial?.id === mat.id;
                  return (
                    <div
                      key={mat.id}
                      onClick={() => handleSelectMaterial(mat)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer text-left flex items-start gap-3 group relative ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-300/90 shadow-xs ring-1 ring-emerald-500/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200/70 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          mat.fileType === 'pdf'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : mat.fileType === 'docx'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs text-slate-800 truncate pr-6">
                          {mat.title}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
                          <span className="font-semibold text-emerald-600">Terindeks</span>
                          <span>•</span>
                          <span>{mat.fileSize}</span>
                        </div>
                      </div>

                      {/* Tombol Hapus Materi */}
                      <button
                        onClick={(e) => handleDeleteMaterial(e, mat.id)}
                        type="button"
                        title="Hapus materi ini"
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all absolute top-2.5 right-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* KOLOM 2 (TENGAH - 5 COLS): ASISTEN STUDI AI (CHAT CENTERPIECE) */}
          <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] flex flex-col h-[740px] overflow-hidden">
            {/* Clean, Elegant Chat Header */}
            <div className="p-4 border-b border-slate-100/90 flex items-center justify-between bg-gradient-to-r from-slate-50/80 via-white to-slate-50/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight flex items-center gap-2">
                    Asisten Studi AI
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Aktif
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5 font-medium">
                    {activeMaterial ? `Memahami: ${activeMaterial.title}` : 'Siap menjawab materi kuliah'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Scroll Area with Premium Typography */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-50/30 to-white/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-[13px] sm:text-sm leading-relaxed transition-all ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-tr from-emerald-600 via-emerald-600 to-teal-600 text-white rounded-tr-xs shadow-md shadow-emerald-600/15 font-medium tracking-tight'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] font-normal'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed">{msg.content}</div>

                    {/* Source Pill button */}
                    {msg.hasSource && msg.sourceText && (
                      <button
                        onClick={() =>
                          setActiveQuote({
                            location: 'Kutipan Jawaban',
                            content: msg.sourceText || '',
                          })
                        }
                        type="button"
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[11px] font-bold hover:bg-emerald-100 hover:text-emerald-900 transition-colors cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        Kutipan Sumber Dokumen
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white border border-slate-200/70 text-slate-500 text-xs w-28 shadow-xs animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200" />
                </div>
              )}
            </div>

            {/* Input Box */}
            <div className="p-3.5 border-t border-slate-100 bg-white/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 bg-slate-50/90 border border-slate-200/90 rounded-2xl px-3.5 py-2 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all shadow-xs"
              >
                <input
                  type="text"
                  placeholder="Tanyakan materi, konsep, atau cari rangkuman..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-400 font-normal"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm shadow-emerald-600/20 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider mt-2 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                AI Assistant Universitas BSI • Riwayat Tersimpan
              </div>
            </div>
          </div>

          {/* KOLOM 3 (KANAN - 4 COLS): RANGKUMAN POKOK MATERI */}
          <div className="lg:col-span-4 space-y-4 sticky top-20">
            {/* AI Summary Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2 tracking-tight">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  Rangkuman Pokok Materi
                </h3>
                {activeMaterial && (
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                    Ringkasan AI
                  </span>
                )}
              </div>

              {activeMaterial ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Waktu baca: {activeMaterial.readingTime || '5 min'}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">Terbaca Lengkap</span>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-normal">
                    {activeMaterial.summary}
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center space-y-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-700">Belum Ada Materi Aktif</h4>
                  <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto leading-relaxed">
                    Unggah atau pilih materi di panel sebelah kiri untuk menampilkan analisis ringkasan cerdas dari AI.
                  </p>
                </div>
              )}
            </div>

            {/* Interactive Quote Source Card */}
            {activeQuote && (
              <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white rounded-3xl p-5 border border-emerald-200/80 shadow-xs relative overflow-hidden animate-in fade-in duration-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Kutipan Asli Dokumen
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/50">
                    {activeQuote.location}
                  </span>
                </div>
                <blockquote className="text-xs text-slate-700 italic leading-relaxed border-l-2 border-emerald-500 pl-3 my-1">
                  {activeQuote.content}
                </blockquote>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Memuat dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
