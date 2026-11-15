'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  LayoutDashboard,
  FolderArchive,
  BrainCircuit,
  History,
  Upload,
  HelpCircle,
  LogOut,
  Sparkles,
  MessageSquare,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  getChatSessions,
  deleteSession,
  createNewSession,
  setActiveSessionId,
  getActiveSessionId,
} from '@/lib/chatHistory';
import { ChatSession } from '@/types';

interface SidebarProps {
  onUploadClick?: () => void;
  onSelectSession?: (sessionId: string) => void;
}

export default function Sidebar({ onUploadClick, onSelectSession }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveId] = useState<string | null>(null);

  const loadSessions = () => {
    const list = getChatSessions();
    setSessions(list);
    const currActive = getActiveSessionId() || (list[0]?.id ?? null);
    setActiveId(currActive);
  };

  useEffect(() => {
    loadSessions();

    const handleUpdate = () => loadSessions();
    window.addEventListener('bsi_chat_sessions_updated', handleUpdate);
    window.addEventListener('bsi_active_session_changed', handleUpdate);

    return () => {
      window.removeEventListener('bsi_chat_sessions_updated', handleUpdate);
      window.removeEventListener('bsi_active_session_changed', handleUpdate);
    };
  }, []);

  const navItems = [
    { label: 'Notebook Baru', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Perpustakaan Saya', href: '/library', icon: FolderArchive },
    { label: 'Quiz AI', href: '/quiz', icon: BrainCircuit },
    { label: 'Riwayat Belajar', href: '/history', icon: History },
  ];

  const handleCreateNewChat = () => {
    const newSess = createNewSession('Materi Kuliah Baru');
    loadSessions();
    if (onSelectSession) {
      onSelectSession(newSess.id);
    }
    if (pathname !== '/dashboard') {
      router.push(`/dashboard?session=${newSess.id}`);
    }
  };

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    setActiveId(id);
    if (onSelectSession) {
      onSelectSession(id);
    }
    if (pathname !== '/dashboard') {
      router.push(`/dashboard?session=${id}`);
    }
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteSession(id);
    setSessions(updated);
    if (activeSessionId === id && updated.length > 0) {
      setActiveSessionId(updated[0].id);
      setActiveId(updated[0].id);
      if (onSelectSession) onSelectSession(updated[0].id);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bsi_user');
    }
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-white/85 backdrop-blur-md border-r border-slate-200/80 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Logo */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-slate-800 text-sm leading-tight tracking-tight flex items-center gap-1.5">
              BSI <span className="text-emerald-600">Notebook</span>
            </div>
            <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
              AI Study Assistant
            </div>
          </div>
        </Link>
      </div>

      {/* New Chat Button (ala ChatGPT/Gemini) */}
      <div className="p-3 pb-1">
        <button
          onClick={handleCreateNewChat}
          type="button"
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          + Obrolan AI Baru
        </button>
      </div>

      {/* Navigation */}
      <div className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto">
        <div className="px-2 py-1 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
          Menu Utama
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs border border-emerald-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-slate-400'
                }`}
              />
              {item.label}
              {item.href === '/quiz' && (
                <span className="ml-auto text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
                  AI
                </span>
              )}
            </Link>
          );
        })}

        {/* Section: Riwayat Tanya AI (Ala ChatGPT / Claude / Gemini) */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between px-2 pb-1.5">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Riwayat Tanya AI
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded-full">
              {sessions.length}
            </span>
          </div>

          <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5">
            {sessions.length === 0 ? (
              <div className="px-2 py-3 text-[11px] text-slate-400 italic text-center">
                Belum ada riwayat chat
              </div>
            ) : (
              sessions.map((sess) => {
                const isSelected = activeSessionId === sess.id && pathname === '/dashboard';
                return (
                  <div
                    key={sess.id}
                    onClick={() => handleSelectSession(sess.id)}
                    className={`group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/90 text-emerald-800 border border-emerald-200/80 font-bold'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <MessageSquare
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'
                        }`}
                      />
                      <span className="truncate text-[11px]" title={sess.title}>
                        {sess.title}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteSession(e, sess.id)}
                      title="Hapus riwayat"
                      type="button"
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-600 rounded transition-opacity shrink-0 text-slate-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Upload Action */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={onUploadClick}
            type="button"
            className="w-full border-2 border-dashed border-emerald-500/40 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 rounded-xl py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-600 group-hover:-translate-y-0.5 transition-transform" />
            Unggah Materi Baru
          </button>
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-2.5 border-t border-slate-100 flex flex-col gap-0.5">
        <Link
          href="/#tentang"
          className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          Pusat Bantuan & Panduan
        </Link>
        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors w-full text-left cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-500" />
          Keluar Sesi
        </button>
      </div>
    </aside>
  );
}
