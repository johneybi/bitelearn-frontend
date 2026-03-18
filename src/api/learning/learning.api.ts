import {
  getMockChapterDetail,
  getMockChaptersByTopic,
  getMockQuizAnswer,
} from './learning.mock';
import type {
  GetLearningChapterResponse,
  GetLearningChapterResultResponse,
  GetLearningChaptersRequest,
  GetLearningChaptersResponse,
  SubmitLearningQuizRequest,
  SubmitLearningQuizResponse,
} from './learning.types';

type ChapterSession = {
  vocabCompleted: boolean;
  solved: Map<number, boolean>;
  latestSequence: number | null;
};

const CHAPTER_SESSION = new Map<number, ChapterSession>();

const MOCK_DELAY_MS = 200;

function withDelay<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), MOCK_DELAY_MS);
  });
}

function getSession(chapterId: number): ChapterSession {
  const existing = CHAPTER_SESSION.get(chapterId);
  if (existing) {
    return existing;
  }

  const created: ChapterSession = {
    vocabCompleted: false,
    solved: new Map<number, boolean>(),
    latestSequence: null,
  };

  CHAPTER_SESSION.set(chapterId, created);
  return created;
}

export async function getLearningChapters(
  params: GetLearningChaptersRequest
): Promise<GetLearningChaptersResponse> {
  return withDelay(getMockChaptersByTopic(params.category, params.topic));
}

export async function getLearningChapter(
  chapterId: number
): Promise<GetLearningChapterResponse> {
  const detail = getMockChapterDetail(chapterId);
  const session = getSession(chapterId);

  let currentStatus = detail.currentStatus;
  let resumeQuizSequence = detail.resumeQuizSequence;

  if (session.solved.size > 0) {
    currentStatus = 'QUIZ_IN_PROGRESS';
    resumeQuizSequence = session.latestSequence;
  }

  if (detail.quizzes.length > 0 && session.solved.size === detail.quizzes.length) {
    currentStatus = 'COMPLETED';
    resumeQuizSequence = detail.quizzes.length;
  }

  return withDelay({
    ...detail,
    currentStatus,
    resumeQuizSequence,
  });
}

export async function completeLearningVocab(chapterId: number) {
  const session = getSession(chapterId);
  session.vocabCompleted = true;
  return withDelay(undefined);
}

export async function submitLearningQuiz(
  chapterId: number,
  quizId: number,
  data: SubmitLearningQuizRequest
): Promise<SubmitLearningQuizResponse> {
  const answerData = getMockQuizAnswer(chapterId, quizId);
  if (!answerData) {
    return withDelay({
      isCorrect: false,
      correctAnswer: '',
      explanation: '문제 정보를 찾을 수 없습니다.',
      newStatus: 'QUIZ_IN_PROGRESS',
    });
  }

  const session = getSession(chapterId);
  const isCorrect = data.selectedAnswer.trim() === answerData.answer.trim();

  session.solved.set(quizId, isCorrect);
  session.latestSequence = answerData.sequence;

  const newStatus =
    session.solved.size >= answerData.lastSequence
      ? 'COMPLETED'
      : 'QUIZ_IN_PROGRESS';

  return withDelay({
    isCorrect,
    correctAnswer: answerData.answer,
    explanation: answerData.explanation,
    newStatus,
  });
}

export async function getLearningChapterResult(
  chapterId: number
): Promise<GetLearningChapterResultResponse> {
  const detail = getMockChapterDetail(chapterId);
  const session = getSession(chapterId);
  const totalCount = detail.quizzes.length;
  const correctCount = Array.from(session.solved.values()).filter(Boolean).length;
  const accuracyRate =
    totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  const earnedBytes = Math.round((accuracyRate / 100) * 500);

  return withDelay({
    correctCount,
    totalCount,
    accuracyRate,
    earnedBytes,
  });
}

