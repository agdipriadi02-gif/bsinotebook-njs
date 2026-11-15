'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import UploadModal from '@/components/UploadModal';
import { initialMaterials } from '@/lib/mockData';
import { Material } from '@/types';
import {
  FolderArchive,
  Search,
  LayoutGrid,
  List,
  FileText,
  Trash2,
  BrainCircuit,
  ExternalLink,
  Plus,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function LibraryPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'pdf' | 'docx' | 'txt'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const filteredMaterials = materials.filter((mat) => {
    const matchesSearch = mat.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'all' || mat.fileType === selectedFormat;
    return matchesSearch && matchesFormat;
  });

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus materi ini dari perpustakaan?')) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar onUploadClick={() => setIsUploadOpen(true)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Perpustakaan Saya"
          contextText={`${materials.length} Bahan Ajar & Modul Tersimpan`}
          onSearch={(q) => setSearchQuery(q)}
        />

        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Bar with Filters & Actions */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { key: 'all', label: 'Semua Berkas' },
                { key: 'pdf', label: 'Dokumen PDF' },
                { key: 'docx', label: 'Word (DOCX)' },
                { key: 'txt', label: 'Teks Catatan' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedFormat(tab.key as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedFormat === tab.key
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode & Add Button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Unggah Materi
              </button>
            </div>
          </div>

          {/* Empty State */}
          {filteredMaterials.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <FolderArchive className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-base text-slate-800">Tidak ada materi ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Coba sesuaikan kata kunci pencarian atau unggah file materi kuliah yang baru.
              </p>
              <button
                onClick={() => setIsUploadOpen(true)}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
              >
                Unggah Dokumen Sekarang
              </button>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && filteredMaterials.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold ${
                          mat.fileType === 'pdf'
                            ? 'bg-rose-100 text-rose-600'
                            : mat.fileType === 'docx'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-amber-100 text-amber-600'
                        }`}
                      >
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        ● Terindeks AI
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
                      {mat.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                      {mat.summary}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-semibold">{mat.fileSize}</span>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href="/quiz"
                        title="Bikin Soal Kuis"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
                      >
                        <BrainCircuit className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/dashboard"
                        title="Buka di Asisten AI"
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(mat.id)}
                        type="button"
                        title="Hapus"
                        className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && filteredMaterials.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden divide-y divide-slate-100">
              {filteredMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                        mat.fileType === 'pdf'
                          ? 'bg-rose-100 text-rose-600'
                          : mat.fileType === 'docx'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {mat.title}
                      </h4>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{mat.fileSize}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold">Siap dipelajari</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href="/quiz"
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <BrainCircuit className="w-3.5 h-3.5 text-emerald-600" />
                      Kuis
                    </Link>
                    <Link
                      href="/dashboard"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      Buka AI
                    </Link>
                    <button
                      onClick={() => handleDelete(mat.id)}
                      type="button"
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={(m) => setMaterials([m, ...materials])}
      />
    </div>
  );
}

