import { Material, Quiz, QuizAttempt, ActivityItem } from '@/types';

export const initialMaterials: Material[] = [
  {
    id: 'mat-1',
    title: 'Modul_1_Pengantar_Kecerdasan_Buatan.pdf',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    status: 'indexed',
    createdAt: 'Baru saja',
    readingTime: '6 min',
    summary:
      'Artificial Intelligence (AI) adalah simulasi kecerdasan manusia yang dimodelkan dalam mesin dan diprogram agar bisa berpikir seperti manusia. Meliputi cabang Machine Learning, Natural Language Processing, Computer Vision, dan Robotics. Fokus utama pembelajaran adalah kemampuan sistem mengenali pola dan melakukan pengambilan keputusan berdasarkan data.',
    quoteSource: {
      location: 'Halaman 3, Paragraf 2',
      content:
        '"Perbedaan fundamental antara pemrograman konvensional dan Machine Learning terletak pada alur: jika pemrograman biasa mengolah data dan aturan menjadi output, maka Machine Learning mengolah data dan jawaban untuk menghasilkan aturan pola."',
    },
    content: 'Materi lengkap modul kecerdasan buatan semester 4 universitas BSI.',
  },
  {
    id: 'mat-2',
    title: 'Catatan_Kuliah_Pemrograman_Web.docx',
    fileType: 'docx',
    fileSize: '840 KB',
    status: 'indexed',
    createdAt: '2 jam lalu',
    readingTime: '8 min',
    summary:
      'Catatan mencakup arsitektur web modern dengan Next.js, React Hooks, SSR (Server Side Rendering), dan integrasi RESTful API. Membahas prinsip clean architecture dan responsive design menggunakan Tailwind CSS untuk mahasiswa teknik informatika.',
    quoteSource: {
      location: 'Halaman 7',
      content:
        '"Next.js App Router mengoptimalkan pengalaman pengguna melalui Server Components yang mengurangi beban komputasi di sisi browser klien."',
    },
  },
  {
    id: 'mat-3',
    title: 'Ringkasan_Basis_Data_Relasional.pdf',
    fileType: 'pdf',
    fileSize: '1.8 MB',
    status: 'indexed',
    createdAt: 'Kemarin',
    readingTime: '5 min',
    summary:
      'Panduan normalisasi 1NF hingga 3NF, kunci integritas data (Primary & Foreign Key), serta optimasi query SQL dengan Indexing dan Transaction ACID (Atomicity, Consistency, Isolation, Durability).',
    quoteSource: {
      location: 'Halaman 12, Sub-bab 4',
      content:
        '"Bentuk normal ketiga (3NF) mensyaratkan setiap atribut non-kunci harus bergantung sepenuhnya dan hanya pada primary key tanpa adanya dependensi transitif."',
    },
  },
];

export const initialQuizzes: Record<string, Quiz> = {
  'mat-1': {
    id: 'quiz-1',
    materialId: 'mat-1',
    title: 'Kuis Evaluasi: Pengantar Kecerdasan Buatan',
    topic: 'Kecerdasan Buatan & Machine Learning',
    totalQuestions: 5,
    durationMinutes: 10,
    questions: [
      {
        id: 1,
        question: 'Apa perbedaan mendasar antara pemrograman konvensional dan Machine Learning?',
        options: {
          A: 'Pemrograman konvensional tidak membutuhkan komputer',
          B: 'Machine Learning belajar pola dari data dan jawaban untuk membentuk aturan',
          C: 'Machine Learning hanya bekerja pada angka biner saja',
          D: 'Keduanya menghasilkan logika statis tanpa update',
        },
        correctAnswer: 'B',
        explanation:
          'Pada Machine Learning, algoritma dilatih menggunakan dataset yang sudah ada untuk mengenali pola dan menghasilkan formula/model secara otomatis.',
      },
      {
        id: 2,
        question: 'Cabang AI yang berfokus pada pemrosesan bahasa manusia adalah...',
        options: {
          A: 'Computer Vision',
          B: 'Robotics Kinematics',
          C: 'Natural Language Processing (NLP)',
          D: 'Genetic Algorithm',
        },
        correctAnswer: 'C',
        explanation:
          'NLP (Natural Language Processing) adalah cabang AI yang memungkinkan mesin membaca, memahami, dan memproduksi bahasa manusia.',
      },
      {
        id: 3,
        question: 'Manakah yang merupakan tipe pembelajaran dalam Machine Learning?',
        options: {
          A: 'Supervised, Unsupervised, & Reinforcement Learning',
          B: 'Compiled, Interpreted, & Asynchronous Learning',
          C: 'Static & Dynamic Learning',
          D: 'HTML, CSS, & JavaScript Learning',
        },
        correctAnswer: 'A',
        explanation:
          'Tiga paradigma utama ML adalah Supervised (dengan label), Unsupervised (tanpa label/clustering), dan Reinforcement (berbasis reward/penalty).',
      },
      {
        id: 4,
        question: 'Teknik deep learning biasanya mengadopsi arsitektur yang terinspirasi dari...',
        options: {
          A: 'Jaringan pipa air',
          B: 'Jaringan syaraf tiruan biologis (Neural Networks)',
          C: 'Sistem file hard drive',
          D: 'Struktur kristal silikon',
        },
        correctAnswer: 'B',
        explanation:
          'Artificial Neural Networks (ANN) mereplikasi cara kerja neuron otak manusia untuk mengklasifikasikan pola kompleks.',
      },
      {
        id: 5,
        question: 'Apa tujuan utama dari proses training pada model AI?',
        options: {
          A: 'Menghapus file sementara',
          B: 'Mengoptimalkan bobot (weights) agar error prediksi sekecil mungkin',
          C: 'Mengubah format file menjadi PDF',
          D: 'Mematikan server saat tidak digunakan',
        },
        correctAnswer: 'B',
        explanation:
          'Training bertujuan mencari parameter bobot (weight & bias) optimal yang meminimalkan nilai loss function.',
      },
    ],
  },
};

export const initialAttempts: QuizAttempt[] = [
  {
    id: 'att-1',
    quizId: 'quiz-1',
    quizTitle: 'Kuis Evaluasi: Pengantar Kecerdasan Buatan',
    score: 100,
    correctCount: 5,
    totalQuestions: 5,
    date: 'Hari ini, 10:15',
  },
  {
    id: 'att-2',
    quizId: 'quiz-2',
    quizTitle: 'Kuis Cepat: Arsitektur Pemrograman Web',
    score: 80,
    correctCount: 4,
    totalQuestions: 5,
    date: 'Kemarin, 14:30',
  },
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'quiz',
    title: 'Menyelesaikan Kuis AI',
    description: 'Skor 100/100 pada Modul 1 Pengantar Kecerdasan Buatan',
    timestamp: '15 menit lalu',
  },
  {
    id: 'act-2',
    type: 'chat',
    title: 'Konsultasi Materi dengan AI',
    description: 'Menanyakan perbedaan Machine Learning vs Deep Learning',
    timestamp: '1 jam lalu',
  },
  {
    id: 'act-3',
    type: 'upload',
    title: 'Unggah Dokumen Baru',
    description: 'Berhasil mengindeks Catatan_Kuliah_Pemrograman_Web.docx',
    timestamp: '2 jam lalu',
  },
  {
    id: 'act-4',
    type: 'upload',
    title: 'Pustaka Diperbarui',
    description: 'Modul_1_Pengantar_Kecerdasan_Buatan.pdf dianalisis AI',
    timestamp: 'Hari ini, 09:00',
  },
];

