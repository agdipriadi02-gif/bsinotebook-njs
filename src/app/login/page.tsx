'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('mahasiswa@bsi.ac.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'bsi_user',
          JSON.stringify({
            name: 'Mahasiswa BSI',
            email: email,
            role: 'Teknik Informatika',
          })
        );
      }
      router.push('/dashboard');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-emerald-50/40 to-slate-100 flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Side: Illustration / Brand Intro */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                BSI <span className="text-emerald-400">Notebook</span>
              </span>
            </Link>

            <div className="mt-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" /> AI Study Assistant
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Masuk & Lanjutkan Belajarmu.
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Akses semua materi kuliah, tanyakan materi sulit pada AI, dan uji pemahaman lewat kuis
                instan.
              </p>
            </div>
          </div>

          <div className="text-xs text-emerald-200/60 font-medium">
            © 2026 Universitas BSI Note Book.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900">Selamat Datang</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gunakan akun mahasiswa atau akun demo untuk masuk.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alamat Email Mahasiswa
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 outline-none transition-all"
                  placeholder="nama@bsi.ac.id"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <a href="#" className="text-[11px] font-bold text-emerald-600 hover:underline">
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
              />
              <label htmlFor="remember" className="text-xs font-semibold text-slate-600">
                Ingat akun di peramban ini
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span>Memproses Masuk...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 py-2 px-4 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Masuk Langsung Sebagai Akun Demo
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Belum punya akun?{' '}
            <Link href="/register" className="font-bold text-emerald-600 hover:underline">
              Daftar gratis di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
