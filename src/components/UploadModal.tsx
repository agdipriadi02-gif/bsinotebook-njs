'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2, FolderOpen } from 'lucide-react';
import { Material } from '@/types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (material: Material) => void;
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'docx' | 'txt' | 'pptx'>('pdf');
  const [fileSizeStr, setFileSizeStr] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  if (!isOpen) return null;

  const handleFilePicked = (file: File) => {
    setSelectedFile(file);
    setFileName(file.name);

    // Format file size
    const sizeInMB = file.size / (1024 * 1024);
    const formattedSize =
      sizeInMB >= 1
        ? sizeInMB.toFixed(1) + ' MB'
        : (file.size / 1024).toFixed(0) + ' KB';
    setFileSizeStr(formattedSize);

    // Detect extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') setFileType('pdf');
    else if (ext === 'docx' || ext === 'doc') setFileType('docx');
    else if (ext === 'txt') setFileType('txt');
    else if (ext === 'pptx' || ext === 'ppt') setFileType('pptx');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFilePicked(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFilePicked(e.dataTransfer.files[0]);
    }
  };

  const handleOpenExplorer = () => {
    fileInputRef.current?.click();
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const cleanTitle = fileName.endsWith('.' + fileType)
        ? fileName
        : `${fileName}.${fileType}`;

      const newMaterial: Material = {
        id: 'mat-' + Date.now(),
        title: cleanTitle,
        fileType: fileType,
        fileSize: fileSizeStr || (Math.random() * 2 + 1).toFixed(1) + ' MB',
        status: 'indexed',
        createdAt: 'Baru saja',
        readingTime: '5 min',
        summary: `Ringkasan cerdas AI untuk "${cleanTitle}": Dokumen ini berisi materi perkuliahan utama yang telah berhasil diekstrak. Seluruh konsep kunci, definisi penting, dan bab pokok telah dipetakan untuk penelusuran kilat serta pembuatan kuis belajar interaktif.`,
        quoteSource: {
          location: 'Halaman 1, Pendahuluan Dokumen',
          content: `"Dokumen ${cleanTitle} memaparkan landasan teoretis, implementasi praktis, dan studi kasus yang siap dipelajari bersama asisten AI."`,
        },
      };

      onUploadSuccess(newMaterial);
      setIsProcessing(false);
      setSelectedFile(null);
      setFileName('');
      setFileSizeStr('');
      onClose();
    }, 1100);
  };

  const handleCloseModal = () => {
    setSelectedFile(null);
    setFileName('');
    setFileSizeStr('');
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 relative">
        {/* Hidden File Input that opens File Explorer */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt,.pptx"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={handleCloseModal}
          type="button"
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 absolute top-4 right-4 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">Unggah Materi Kuliah</h3>
            <p className="text-xs text-slate-500">Mendukung format PDF, Word DOCX, & TXT</p>
          </div>
        </div>

        <form onSubmit={handleUploadSubmit} className="space-y-4">
          {/* Interactive Dotted Upload Area (Klik untuk buka File Explorer) */}
          <div
            onClick={handleOpenExplorer}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer select-none ${
              isDragOver
                ? 'border-emerald-500 bg-emerald-100/50 scale-[1.02]'
                : selectedFile
                ? 'border-emerald-400 bg-emerald-50/60 shadow-xs'
                : 'border-emerald-500/40 bg-emerald-50/30 hover:bg-emerald-50/70 hover:border-emerald-600'
            }`}
          >
            {selectedFile ? (
              <div className="space-y-1.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-xs font-extrabold text-slate-800 truncate max-w-[280px] mx-auto">
                  {selectedFile.name}
                </p>
                <p className="text-[11px] text-emerald-700 font-bold">
                  {fileSizeStr} • Siap diproses AI
                </p>
                <p className="text-[10px] text-slate-400 underline hover:text-slate-600 pt-1">
                  Klik untuk mengganti berkas lain
                </p>
              </div>
            ) : (
              <div>
                <FolderOpen className="w-9 h-9 text-emerald-600 mx-auto mb-2 animate-bounce" />
                <p className="text-xs font-bold text-slate-800">
                  Klik di sini untuk memilih dokumen
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  atau tarik (drag & drop) berkas langsung dari File Explorer
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Judul Materi atau Nama File
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Modul_2_Struktur_Data"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white text-xs font-medium outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tipe Berkas
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['pdf', 'docx', 'txt'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFileType(type)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                    fileType === type
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  .{type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isProcessing || !fileName.trim()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isProcessing ? (
                <span>Mengekstrak AI...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Mulai Proses
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
