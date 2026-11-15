import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  BrainCircuit,
  MessageSquareCode,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  GraduationCap,
  ChevronRight,
  Headphones,
  Sliders,
  Layers,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white font-sans">
      {/* Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-800 text-lg tracking-tight">
                BSI <span className="text-emerald-600">Notebook</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#fitur" className="hover:text-emerald-600 transition-colors">
              Fitur Cerdas
            </Link>
            <Link href="#demo" className="hover:text-emerald-600 transition-colors">
              Pratinjau AI
            </Link>
            <Link href="#keunggulan" className="hover:text-emerald-600 transition-colors">
              Keunggulan
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
              Mulai Belajar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Decorative Blurred Gradient Blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-300/30 to-teal-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold tracking-wide uppercase mb-6 shadow-xs border border-emerald-200/60 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Didukung BSI AI Engine 2.0
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none mb-6">
            Belajar Lebih Cerdas dengan{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
              BSI Note Book
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            Asisten AI mahasiswa untuk mengekstrak modul PDF kuliah, merangkum poin esensial,
            menjawab pertanyaan dengan kutipan halaman akurat, dan membuat kuis latihan otomatis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-extrabold shadow-xl shadow-emerald-600/25 hover:shadow-2xl hover:shadow-emerald-600/35 transition-all flex items-center justify-center gap-3 group"
            >
              Buka Dashboard Belajar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/quiz"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-base font-bold shadow-xs transition-all flex items-center justify-center gap-2.5"
            >
              <BrainCircuit className="w-5 h-5 text-emerald-600" />
              Coba Kuis AI
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rangkuman Otomatis
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kutipan Sumber Halaman
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Generator Soal Ujian
            </span>
          </div>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div id="demo" className="mt-16 max-w-5xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-3 sm:p-4 shadow-2xl ring-1 ring-slate-800">
            {/* Topbar of Mockup */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 mb-3">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="ml-4 text-xs font-mono text-slate-400 truncate">
                bsi-notebook.test/dashboard — Modul_1_Pengantar_AI.pdf
              </div>
            </div>

            {/* Inner Dashboard Layout Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-950/70 rounded-2xl p-4 text-left border border-slate-800">
              {/* Left Material Selection */}
              <div className="md:col-span-3 space-y-2 border-b md:border-b-0 md:border-r border-slate-800/80 pb-3 md:pb-0 md:pr-3">
                <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Koleksi Berkas
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-xs font-semibold text-emerald-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">Modul_1_Pengantar_AI.pdf</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">Pemrograman_Web.docx</span>
                </div>
              </div>

              {/* Center Content Mockup */}
              <div className="md:col-span-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                    Summary AI
                  </span>
                  <span className="text-[11px] text-slate-400">⏱ Waktu baca: 6 min</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">
                  Rangkuman Pokok: Konsep Kecerdasan Buatan
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kecerdasan Buatan (AI) memodelkan penalaran dan pengambilan keputusan adaptif.
                  Sub-bidang utamanya meliputi Machine Learning, NLP, dan Computer Vision.
                </p>
                <div className="p-2.5 rounded-xl bg-emerald-900/20 border border-emerald-700/30 text-[11px] text-emerald-300">
                  <span className="font-bold block text-emerald-400">Kutipan Sumber: Halaman 3</span>
                  &quot;Machine Learning belajar pola dari data untuk menyusun formula otomatis.&quot;
                </div>
              </div>

              {/* Right Chat AI Mockup */}
              <div className="md:col-span-4 bg-slate-900/80 rounded-xl p-3 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 border-b border-slate-800 pb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Asisten Studi AI
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-950/60 text-[11px] text-emerald-200 border border-emerald-800/40">
                    Halo! Modul 1 sudah siap. Mau tanya bagian apa atau langsung latihan soal?
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/70 text-[11px] text-slate-300 ml-auto max-w-[85%] text-right">
                    Apa bedanya AI dengan Machine Learning?
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
                  <span>Ketik pertanyaanmu...</span>
                  <span className="text-emerald-400 font-bold">Kirim ↵</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="fitur" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mb-4">
            Dirancang Khusus untuk Mahasiswa
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Kombinasi teknologi ekstraksi cerdas dan AI generatif untuk memangkas waktu belajar tanpa
            mengurangi kualitas pemahaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Ekstraksi Dokumen Instan</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upload file materi kuliah dalam bentuk PDF, DOCX, atau PPT. Sistem mengekstrak isi teks
              secara rapi dan terstruktur per halaman.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Kuis & Ujian Otomatis</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              AI secara otomatis merumuskan soal pilihan ganda lengkap dengan kunci jawaban dan
              pembahasan langsung dari dokumen Anda.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
              <MessageSquareCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Tanya AI dengan Bukti Sumber</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tidak ada jawaban halusinasi. Setiap jawaban AI dilengkapi kutipan teks asli dan nomor
              halaman dokumen Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Expansion AI Features Grid */}
      <section id="keunggulan" className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                Fitur Tambahan
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Ekspansi Pembelajaran Multimedia
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
            >
              Coba Semua di Dashboard <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all">
              <Headphones className="w-6 h-6 text-indigo-600 mb-3" />
              <div className="font-bold text-xs text-slate-800">Ringkasan Audio</div>
              <div className="text-[11px] text-slate-500 mt-1">Format podcast kuliah</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all">
              <Sliders className="w-6 h-6 text-emerald-600 mb-3" />
              <div className="font-bold text-xs text-slate-800">Slide Deck PPT</div>
              <div className="text-[11px] text-slate-500 mt-1">Poin presentasi kilat</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all">
              <Layers className="w-6 h-6 text-sky-600 mb-3" />
              <div className="font-bold text-xs text-slate-800">Peta Pikiran</div>
              <div className="text-[11px] text-slate-500 mt-1">Mind map hierarkis</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all">
              <BookOpen className="w-6 h-6 text-rose-600 mb-3" />
              <div className="font-bold text-xs text-slate-800">Flashcards</div>
              <div className="text-[11px] text-slate-500 mt-1">Kartu memori cerdas</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all col-span-2 sm:col-span-1">
              <Zap className="w-6 h-6 text-amber-500 mb-3" />
              <div className="font-bold text-xs text-slate-800">Infografis</div>
              <div className="text-[11px] text-slate-500 mt-1">Diagram data visual</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-800 pb-12 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                BSI <span className="text-emerald-400">Notebook</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Platform pendamping belajar digital berbasis AI untuk mahasiswa Universitas BSI.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
            >
              Buka Aplikasi Sekarang
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center text-xs text-slate-500">
          © 2026 BSI Note Book — Next.js Edition. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
