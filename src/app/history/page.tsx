'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { initialActivities, initialAttempts } from '@/lib/mockData';
import { getChatSessions, deleteSession, saveChatSessions } from '@/lib/chatHistory';
import { ChatSession } from '@/types';
import {
  History,
  Trophy,
  BrainCircuit,
  MessageSquare,
  Upload,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Search,
  Trash2,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadSessions = () => {
    const list = getChatSessions();
    setSessions(list);
  };

  useEffect(() => {
    loadSessions();

    const handleUpdate = () => loadSessions();
    window.addEventListener('bsi_chat_sessions_updated', handleUpdate);
    return () => {
      window.removeEventListener('bsi_chat_sessions_updated', handleUpdate);
    };
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteSession(id);
    setSessions(updated);
  };

  const handleClearAll = () => {
    if (confirm('Apakah kamu yakin ingin menghapus semua riwayat percakapan AI?')) {
      saveChatSessions([]);
      setSessions([]);
    }
  };

  const filteredSessions = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.materialTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.messages.some((m) => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalQuestionsAsked = sessions.reduce((acc, s) => {
    return acc + s.messages.filter((m) => m.role === 'user').length;
  }, 0);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Riwayat Belajar & Percakapan AI"
          contextText="Pantau Progres Belajar & Riwayat Pertanyaan AI"
        />

        <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{sessions.length} Sesi</div>
                <div className="text-[11px] font-bold text-slate-400">Riwayat Tanya AI</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">
                  {totalQuestionsAsked || 12} Tanya
                </div>
                <div className="text-[11px] font-bold text-slate-400">Total Topik Dicari</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">92%</div>
                <div className="text-[11px] font-bold text-slate-400">Rata-rata Skor Kuis</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">3 Modul</div>
                <div className="text-[11px] font-bold text-slate-400">Bahan Terindeks</div>
              </div>
            </div>
          </div>

          {/* Section: Riwayat Tanya AI & Pencarian Materi (Ala AI Modern) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Riwayat Pertanyaan & Pencarian AI
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daftar seluruh topik dan pertanyaan yang pernah Anda ajukan ke asisten cerdas.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari riwayat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-xl outline-none transition-all w-40 sm:w-52"
                  />
                </div>

                {sessions.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    type="button"
                    className="p-1.5 text-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors"
                    title="Hapus Semua Riwayat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {filteredSessions.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                Tidak ada riwayat percakapan yang cocok.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredSessions.map((sess) => {
                  const lastUserMsg = [...sess.messages]
                    .reverse()
                    .find((m) => m.role === 'user')?.content;
                  const lastAiMsg = [...sess.messages]
                    .reverse()
                    .find((m) => m.role === 'assistant')?.content;

                  return (
                    <div
                      key={sess.id}
                      className="p-4 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/40 border border-slate-200/70 hover:border-emerald-300 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <MessageSquare className="w-3.5 h-3.5" />
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">
                              {sess.title}
                            </h4>
                          </div>

                          <button
                            onClick={() => handleDelete(sess.id)}
                            type="button"
                            title="Hapus"
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {lastUserMsg && (
                          <div className="text-[11px] text-slate-600 mb-1.5 bg-white/80 p-2 rounded-xl border border-slate-100">
                            <span className="font-semibold text-emerald-700">Tanya: </span>
                            <span className="italic line-clamp-2">"{lastUserMsg}"</span>
                          </div>
                        )}

                        {lastAiMsg && (
                          <div className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            <span className="font-semibold text-slate-700">AI: </span>
                            {lastAiMsg.replace(/[#*]/g, '')}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{sess.createdAt}</span>
                          {sess.materialTitle && (
                            <>
                              <span>•</span>
                              <span className="truncate max-w-[120px] font-medium text-slate-500">
                                {sess.materialTitle}
                              </span>
                            </>
                          )}
                        </div>

                        <Link
                          href={`/dashboard?session=${sess.id}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 group-hover:translate-x-0.5 transition-all"
                        >
                          Buka Chat <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Riwayat Kuis */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  Hasil Evaluasi Kuis AI
                </h3>
                <Link
                  href="/quiz"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  Mulai Kuis Baru <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {initialAttempts.map((att) => (
                  <div
                    key={att.id}
                    className="p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4 transition-all"
                  >
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">{att.quizTitle}</h4>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {att.date} • {att.correctCount} dari {att.totalQuestions} Benar
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1.5 rounded-xl font-black text-xs ${
                          att.score >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {att.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Aktivitas Interaksi AI */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-600" />
                  Linimasa Aktivitas
                </h3>
              </div>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-100">
                {initialActivities.map((act) => (
                  <div key={act.id} className="relative flex items-start gap-3.5 pl-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shrink-0 ring-4 ring-white shadow-xs">
                      {act.type === 'quiz' ? (
                        <Trophy className="w-3 h-3" />
                      ) : act.type === 'chat' ? (
                        <MessageSquare className="w-3 h-3" />
                      ) : (
                        <Upload className="w-3 h-3" />
                      )}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{act.title}</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                        {act.description}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block font-semibold">
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
