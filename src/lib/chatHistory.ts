import { ChatSession, ChatMessage } from '@/types';

const STORAGE_KEY = 'bsi_ai_chat_sessions';
const ACTIVE_SESSION_KEY = 'bsi_ai_active_session_id';

export const defaultChatSessions: ChatSession[] = [
  {
    id: 'session-1',
    title: 'Perbedaan AI dan Machine Learning',
    materialId: 'mat-1',
    materialTitle: 'Modul_1_Pengantar_Kecerdasan_Buatan.pdf',
    createdAt: 'Hari ini, 10:30',
    updatedAt: 'Baru saja',
    messages: [
      {
        id: 'msg-1',
        role: 'assistant',
        content:
          'Halo! Saya sudah mempelajari materi **"Modul_1_Pengantar_Kecerdasan_Buatan.pdf"**. Ada bagian modul yang ingin kamu pahami lebih mendalam?',
        time: '10:30',
      },
      {
        id: 'msg-2',
        role: 'user',
        content: 'Apa perbedaan mendasar antara AI dan Machine Learning?',
        time: '10:31',
      },
      {
        id: 'msg-3',
        role: 'assistant',
        content:
          'Berdasarkan **Halaman 3**, perbedaan utamanya adalah:\n\n• **Pemrograman Konvensional**: Programmer menulis kode dan aturan logika secara manual.\n• **Machine Learning**: Komputer dilatih dengan data dan jawaban agar model sendiri yang menemukan aturan dan formula polanya.',
        time: '10:31',
        hasSource: true,
        sourceText:
          '"Perbedaan fundamental antara pemrograman konvensional dan Machine Learning terletak pada alur: jika pemrograman biasa mengolah data dan aturan menjadi output, maka Machine Learning mengolah data dan jawaban untuk menghasilkan aturan pola."',
      },
    ],
  },
  {
    id: 'session-2',
    title: 'Rangkuman Pokok Arsitektur Web Next.js',
    materialId: 'mat-2',
    materialTitle: 'Catatan_Kuliah_Pemrograman_Web.docx',
    createdAt: 'Kemarin, 16:45',
    updatedAt: 'Kemarin',
    messages: [
      {
        id: 'msg-201',
        role: 'user',
        content: 'Tolong buatkan rangkuman pokok arsitektur Next.js di catatan ini',
        time: '16:45',
      },
      {
        id: 'msg-202',
        role: 'assistant',
        content:
          'Berikut 3 poin esensial arsitektur Next.js:\n\n1. **App Router**: Mengadopsi React Server Components untuk render cepat.\n2. **Zero-bundle Client**: Kode yang tidak butuh interaksi dieksekusi di server.\n3. **Optimasi Otomatis**: Font, gambar, dan skrip langsung di-bundling secara efisien.',
        time: '16:45',
        hasSource: true,
        sourceText:
          '"Next.js App Router mengoptimalkan pengalaman pengguna melalui Server Components yang mengurangi beban komputasi di sisi browser klien."',
      },
    ],
  },
  {
    id: 'session-3',
    title: 'Aturan Normalisasi Basis Data 3NF',
    materialId: 'mat-3',
    materialTitle: 'Ringkasan_Basis_Data_Relasional.pdf',
    createdAt: '2 hari lalu',
    updatedAt: '2 hari lalu',
    messages: [
      {
        id: 'msg-301',
        role: 'user',
        content: 'Bagaimana penjelasan mudah aturan normalisasi 3NF?',
        time: '2 hari lalu',
      },
      {
        id: 'msg-302',
        role: 'assistant',
        content:
          'Aturan 3NF (Third Normal Form) intinya:\n\nSetiap kolom non-primary key **hanya boleh bergantung langsung** pada Primary Key, dan tidak boleh bergantung pada kolom biasa lainnya (tidak ada transitive dependency).',
        time: '2 hari lalu',
        hasSource: true,
        sourceText:
          '"Bentuk normal ketiga (3NF) mensyaratkan setiap atribut non-kunci harus bergantung sepenuhnya dan hanya pada primary key tanpa adanya dependensi transitif."',
      },
    ],
  },
];

export function getChatSessions(): ChatSession[] {
  if (typeof window === 'undefined') return defaultChatSessions;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultChatSessions));
      return defaultChatSessions;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultChatSessions;
  } catch (err) {
    console.error('Error reading chat sessions:', err);
    return defaultChatSessions;
  }
}

export function saveChatSessions(sessions: ChatSession[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    // Trigger custom event so sidebar and other components update in real-time
    window.dispatchEvent(new Event('bsi_chat_sessions_updated'));
  } catch (err) {
    console.error('Error saving chat sessions:', err);
  }
}

export function getActiveSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_SESSION_KEY) || null;
}

export function setActiveSessionId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_SESSION_KEY, id);
  window.dispatchEvent(new Event('bsi_active_session_changed'));
}

export function createNewSession(materialTitle = 'Materi Kuliah', materialId = 'mat-1'): ChatSession {
  const newSession: ChatSession = {
    id: 'session-' + Date.now(),
    title: 'Percakapan Baru',
    materialId,
    materialTitle,
    createdAt: 'Baru saja',
    updatedAt: 'Baru saja',
    messages: [
      {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: `Halo! Saya asisten AI belajar BSI. Siap membantu menjawab pertanyaan dan menganalisis materi **"${materialTitle}"**. Apa yang ingin kamu tanyakan?`,
        time: 'Baru saja',
      },
    ],
  };

  const current = getChatSessions();
  const updated = [newSession, ...current];
  saveChatSessions(updated);
  setActiveSessionId(newSession.id);
  return newSession;
}

export function deleteSession(id: string): ChatSession[] {
  const current = getChatSessions();
  const filtered = current.filter((s) => s.id !== id);
  saveChatSessions(filtered);
  return filtered;
}

