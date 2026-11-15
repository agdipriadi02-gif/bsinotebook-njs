'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  title?: string;
  contextText?: string;
  onSearch?: (query: string) => void;
}

export default function Header({
  title = 'Notebook Baru',
  contextText = 'Materi Kuliah Aktif',
  onSearch,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 px-6 bg-white/70 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-20">
      {/* Left Context Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm sm:text-base tracking-tight">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{title}</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="text-xs font-semibold text-slate-500 truncate max-w-xs sm:max-w-md hidden md:block">
          {contextText}
        </div>
      </div>

      {/* Center Search (Optional) */}
      <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari materi, kuis, atau catatan..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200/70 focus:border-emerald-500 rounded-full outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Navigation Quick Links */}
        <div className="hidden sm:flex items-center bg-slate-100/80 p-0.5 rounded-full border border-slate-200/60 text-xs font-bold text-slate-600 mr-1">
          <Link
            href="/dashboard"
            className="px-3 py-1 rounded-full hover:text-emerald-700 transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/library"
            className="px-3 py-1 rounded-full hover:text-emerald-700 transition-colors"
          >
            Pustaka
          </Link>
          <Link
            href="/quiz"
            className="px-3 py-1 rounded-full hover:text-emerald-700 transition-colors"
          >
            Kuis
          </Link>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            type="button"
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 transition-all cursor-pointer relative shadow-xs"
            title="Pemberitahuan"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-xs text-slate-800">
                <span>Notifikasi</span>
                <span className="text-[10px] text-emerald-600">Tandai dibaca</span>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <p className="font-semibold text-emerald-900">Modul 1 Siap Dipelajari</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    AI berhasil mengekstrak 35 halaman & menyusun kuis.
                  </p>
                </div>
                <div className="p-2 rounded-lg hover:bg-slate-50 border border-transparent">
                  <p className="font-semibold text-slate-800">Kuis AI Baru Tersedia</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Latih pemahamanmu dengan 5 soal acak.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            MA
          </div>
          <div className="hidden xl:block text-left text-xs leading-tight">
            <div className="font-bold text-slate-800">Mahasiswa BSI</div>
            <div className="text-[10px] text-slate-400">Teknik Informatika</div>
          </div>
        </div>
      </div>
    </header>
  );
}

