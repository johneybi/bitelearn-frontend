import type { Category, Topic } from '@/api/learning/learning.types';

// 오답노트 목록 조회
export type GetNotesRequest = {
  category?: Category;
  cursor?: number | null;
};

export type Note = {
  noteId: number;
  chapterId: number;
  quizId: number;
  category: Category;
  topic: Topic;
  questionTitle: string;
  userAnswer: string;
  correctAnswer: string;
  createdAt: string;
};

export type GetNotesResponse = {
  totalCount: number;
  totalBytes: number;
  notes: Note[];
  nextCursor: number | null;
  hasNext: boolean;
};
