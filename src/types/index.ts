export interface Material {
  id: string;
  title: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'pptx';
  fileSize: string;
  status: 'indexed' | 'processing';
  createdAt: string;
  readingTime: string;
  summary: string;
  quoteSource?: {
    location: string;
    content: string;
  };
  content?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
  hasSource?: boolean;
  sourceText?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  materialId?: string;
  materialTitle?: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface QuizOption {
  key: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  materialId: string;
  title: string;
  topic: string;
  totalQuestions: number;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  date: string;
}

export interface ActivityItem {
  id: string;
  type: 'upload' | 'chat' | 'quiz';
  title: string;
  description: string;
  timestamp: string;
}

