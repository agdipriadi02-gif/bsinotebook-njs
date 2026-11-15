'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { initialQuizzes, initialMaterials } from '@/lib/mockData';
import { Quiz, QuizQuestion } from '@/types';
import {
  BrainCircuit,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function QuizPage() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(initialQuizzes['mat-1']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes

  // Countdown timer
  useEffect(() => {
    if (isSubmitted || !activeQuiz) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, activeQuiz]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: number, optionKey: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleRestart = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setSecondsRemaining(600);
  };

  // Score calculations
  const calculateScore = () => {
    if (!activeQuiz) return { score: 0, correct: 0, total: 0 };
    let correct = 0;
    activeQuiz.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const total = activeQuiz.questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { score, correct, total };
  };

  const { score, correct, total } = calculateScore();

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Quiz AI Evaluasi"
          contextText={activeQuiz ? activeQuiz.title : 'Pilih Modul Soal'}
        />

        <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-6">
          {/* Quiz Header Banner */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Ujian Otomatis AI
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">{activeQuiz?.title}</h2>
              <p className="text-xs text-emerald-100/80 mt-1">
                Topik: {activeQuiz?.topic} • {activeQuiz?.totalQuestions} Soal Pilihan Ganda
              </p>
            </div>

            {!isSubmitted && (
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 flex items-center gap-2.5 self-start sm:self-auto">
                <Clock className="w-5 h-5 text-amber-300 animate-pulse" />
                <div>
                  <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">
                    Sisa Waktu
                  </div>
                  <div className="text-base font-mono font-extrabold text-white">
                    {formatTimer(secondsRemaining)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACTIVE QUIZ SCREEN */}
          {!isSubmitted && activeQuiz && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              {/* Question Progress Tracker */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>
                    Soal {currentQuestionIndex + 1} dari {activeQuiz.questions.length}
                  </span>
                  <span>{Math.round(((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Current Question */}
              {(() => {
                const q = activeQuiz.questions[currentQuestionIndex];
                const selected = userAnswers[q.id];

                return (
                  <div className="space-y-5 pt-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                      {q.id}. {q.question}
                    </h3>

                    {/* Options Grid */}
                    <div className="space-y-3">
                      {Object.entries(q.options).map(([key, text]) => {
                        const isChosen = selected === key;
                        return (
                          <div
                            key={key}
                            onClick={() => handleSelectOption(q.id, key)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                              isChosen
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                                : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80 text-slate-700'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                isChosen
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white text-slate-600 border border-slate-200'
                              }`}
                            >
                              {key}
                            </span>
                            <span className="text-xs sm:text-sm font-medium leading-relaxed">
                              {text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Navigation Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                >
                  Sebelumnya
                </button>

                {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    Selanjutnya
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Kumpulkan Jawaban
                  </button>
                )}
              </div>
            </div>
          )}

          {/* RESULTS SCREEN */}
          {isSubmitted && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Score Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md text-center space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <Trophy className="w-10 h-10" />
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900">{score}%</div>
                  <h3 className="text-base font-extrabold text-slate-800 mt-1">
                    {score >= 80 ? 'Luar Biasa! Pemahaman Sangat Baik' : 'Bagus! Tetap Semangat Berlatih'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Anda berhasil menjawab benar <strong>{correct}</strong> dari{' '}
                    <strong>{total}</strong> soal.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Ulangi Kuis
                  </button>
                  <Link
                    href="/dashboard"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2"
                  >
                    <span>Lanjut Belajar di Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Pembahasan Detail Review */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Pembahasan Soal & Kunci Jawaban
                </h3>

                <div className="space-y-6">
                  {activeQuiz?.questions.map((q) => {
                    const chosen = userAnswers[q.id];
                    const isCorrect = chosen === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border ${
                          isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 mb-3">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                          )}
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                            {q.id}. {q.question}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 pl-7">
                          <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                            <span className="font-bold text-slate-500 block text-[10px]">
                              Jawaban Kamu:
                            </span>
                            <span className={isCorrect ? 'font-bold text-emerald-700' : 'font-bold text-rose-600'}>
                              {chosen ? `${chosen}. ${q.options[chosen]}` : 'Tidak dijawab'}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                            <span className="font-bold text-emerald-600 block text-[10px]">
                              Kunci Jawaban Benar:
                            </span>
                            <span className="font-bold text-emerald-800">
                              {q.correctAnswer}. {q.options[q.correctAnswer]}
                            </span>
                          </div>
                        </div>

                        <div className="pl-7 text-xs text-slate-600 bg-white/70 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                          <strong className="text-slate-800 block mb-0.5">Penjelasan AI:</strong>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

