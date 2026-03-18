export type LearningProgressStatus =
  | 'READY'
  | 'QUIZ_IN_PROGRESS'
  | 'COMPLETED';

export type LearningQuizType =
  | 'TEXT_MCQ'
  | 'DOC_SELECT'
  | 'DOC_MULTI'
  | 'DIALOGUE_MCQ'
  | 'DIALOGUE_OX';

export type LearningCategoryCode =
  | 'REAL_ESTATE'
  | 'FINANCE'
  | 'CAREER'
  | 'INVESTMENT';

export type LearningTopicCode = string;

export type LearningChapterListItem = {
  chapterId: number;
  title: string;
  status: LearningProgressStatus;
  sequence: number;
  isLocked?: boolean;
};

export type GetLearningChaptersRequest = {
  category: LearningCategoryCode;
  topic: LearningTopicCode;
};

export type GetLearningChaptersResponse = {
  chapters: LearningChapterListItem[];
};

export type LearningVocab = {
  id: number;
  frontMain: string;
  frontSub?: string;
  frontImageUrl?: string | null;
  backMain: string;
  backSub?: string;
};

export type DialogueLine = {
  speaker: string;
  message: string;
};

export type LearningQuizSpecificData = {
  options?: Array<string | { docId: string; docText: string }>;
  dialogues?: DialogueLine[];
};

export type LearningQuiz = {
  quizId: number;
  sequence: number;
  type: LearningQuizType;
  passageTitle?: string | null;
  passageContent?: string | null;
  questionImageUrl?: string | null;
  questionTitle: string;
  specificData?: LearningQuizSpecificData | null;
};

export type GetLearningChapterResponse = {
  chapterTitle: string;
  prologueSubtitle: string;
  prologueContent: string;
  currentGoal: string;
  coreKeywords: string[];
  currentStatus: LearningProgressStatus;
  resumeQuizSequence: number | null;
  vocabs: LearningVocab[];
  quizzes: LearningQuiz[];
};

export type SubmitLearningQuizRequest = {
  selectedAnswer: string;
};

export type SubmitLearningQuizResponse = {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  newStatus: LearningProgressStatus;
};

export type GetLearningChapterResultResponse = {
  correctCount: number;
  totalCount: number;
  accuracyRate: number;
  earnedBytes: number;
};
