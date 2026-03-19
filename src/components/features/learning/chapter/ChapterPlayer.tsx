import { useMemo, useState } from 'react';

import QuizPlayer from '@/components/features/learning/quiz/QuizPlayer';
import ChapterDone from './ChapterDone';
import ChapterResult from './ChapterResult';
import ChapterIntro from './ChapterIntro';
import VocabDone from '../vocab/VocabDone';

import type {
  QuizMetric,
  StepIndicatorInfo,
} from '@/components/features/learning/quiz/quiz.types';
import VocabCardsPlayer from '../vocab/VocabCardsPlayer';
import type {
  ChapterResultResponse,
  ChapterStatus,
  QuizInfo,
  QuizSubmitResponse,
  VocabInfo,
} from '@/api/learning/learning.types';
import { toast } from 'sonner';

type ChapterPhase =
  | 'intro'
  | 'vocabs'
  | 'vocab_done'
  | 'quiz'
  | 'done'
  | 'final';

type ChapterIntroData = {
  prologueSubtitle: string;
  goal: string;
  prologueContent: string;
  coreKeywords: string[];
};

type ChapterPlayerProps = {
  chapterTitle: string;
  vocabs: VocabInfo[];
  quizzes: QuizInfo[];
  chapterIntro: ChapterIntroData;
  initialStatus?: ChapterStatus;
  initialQuizSequence?: number | null;
  onVocabComplete?: () => Promise<void>;
  onSubmitQuiz: (
    quizId: number,
    selectedAnswer: string
  ) => Promise<QuizSubmitResponse>;
  onFetchResult: () => Promise<ChapterResultResponse>;
  onComplete: (total: number, correct: number) => void;
  onBack: () => void;
};

export default function ChapterPlayer({
  chapterTitle,
  vocabs,
  quizzes,
  chapterIntro,
  initialStatus = 'READY',
  initialQuizSequence = null,
  onVocabComplete,
  onSubmitQuiz,
  onFetchResult,
  onComplete,
  onBack,
}: ChapterPlayerProps) {
  const initialPhase: ChapterPhase = 'intro';
  const isQuizInProgress = initialStatus === 'QUIZ_IN_PROGRESS';
  const chapterIntroMode =
    initialStatus === 'COMPLETED'
      ? 'retry'
      : isQuizInProgress
        ? 'resume'
        : 'start';

  const [chapterPhase, setChapterPhase] = useState<ChapterPhase>(initialPhase);
  const [quizResult, setQuizResult] = useState<ChapterResultResponse | null>(
    null
  );
  const [vocabIdx, setVocabIdx] = useState(0);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(
    isQuizInProgress && initialQuizSequence && initialQuizSequence > 0
      ? initialQuizSequence - 1
      : 0
  );
  const [quizMetrics, setQuizMetrics] = useState<QuizMetric[]>(
    Array(quizzes.length).fill('none')
  );

  const handleQuizComplete = () => {
    onFetchResult()
      .then((result) => {
        setQuizResult(result);
        setChapterPhase('done');
      })
      .catch(() => {
        toast.error('챕터 결과를 불러오지 못했습니다.');
      });
  };

  const submitQuizAnswer = async (
    question: QuizInfo,
    selectedAnswerIndex: number
  ) => {
    const selectedAnswer =
      question.specificData?.options?.[selectedAnswerIndex] ?? '';

    if (typeof selectedAnswer !== 'string') {
      throw new Error('퀴즈 제출에 필요한 데이터가 올바르지 않습니다.');
    }

    return onSubmitQuiz(question.quizId, selectedAnswer);
  };

  const chapterIndicatorSteps: StepIndicatorInfo[] = useMemo(() => {
    const vocabSteps: StepIndicatorInfo[] = vocabs.map((_, idx) => ({
      type: 'vocab',
      status: 'none',
      isCurrent: chapterPhase === 'vocabs' && idx === vocabIdx,
    }));

    const quizSteps: StepIndicatorInfo[] = quizzes.map((_, idx) => ({
      type: 'quiz',
      status: chapterPhase === 'vocabs' ? 'none' : quizMetrics[idx],
      isCurrent: chapterPhase === 'quiz' && idx === quizCurrentIndex,
    }));

    return [...vocabSteps, ...quizSteps];
  }, [vocabs, quizzes, chapterPhase, vocabIdx, quizCurrentIndex, quizMetrics]);

  if (chapterPhase === 'final' && quizResult) {
    return (
      <ChapterResult
        correct={quizResult.correctCount}
        total={quizResult.totalCount}
        accuracyRate={quizResult.accuracyRate}
        earnedBytes={quizResult.earnedBytes}
        chapterTitle={chapterTitle}
        onFinish={() =>
          onComplete(quizResult.totalCount, quizResult.correctCount)
        }
      />
    );
  }

  if (chapterPhase === 'done' && quizResult) {
    return (
      <ChapterDone
        correct={quizResult.correctCount}
        total={quizResult.totalCount}
        accuracyRate={quizResult.accuracyRate}
        chapterTitle={chapterTitle}
        onFinish={() => setChapterPhase('final')}
      />
    );
  }

  if (chapterPhase === 'quiz') {
    return (
      <QuizPlayer
        questions={quizzes}
        headerTitle={chapterTitle}
        onBack={onBack}
        onComplete={handleQuizComplete}
        indicatorSteps={chapterIndicatorSteps}
        onCurrentIndexChange={setQuizCurrentIndex}
        onMetricsChange={setQuizMetrics}
        initialIndex={quizCurrentIndex}
        onSubmitAnswer={submitQuizAnswer}
      />
    );
  }

  if (chapterPhase === 'intro') {
    return (
      <ChapterIntro
        chapterTitle={chapterTitle}
        prologueSubtitle={chapterIntro.prologueSubtitle}
        chapterGoal={chapterIntro.goal}
        prologueContent={chapterIntro.prologueContent}
        coreKeywords={chapterIntro.coreKeywords}
        introMode={chapterIntroMode}
        onBack={onBack}
        onStart={() => {
          if (isQuizInProgress) {
            setChapterPhase('quiz');
            return;
          }

          if (vocabs.length > 0) {
            setChapterPhase('vocabs');
            return;
          }

          setChapterPhase('quiz');
        }}
      />
    );
  }

  if (chapterPhase === 'vocab_done') {
    return (
      <VocabDone
        chapterTitle={chapterTitle}
        onClose={onBack}
        onStartQuiz={() => setChapterPhase('quiz')}
      />
    );
  }

  return (
    <VocabCardsPlayer
      chapterTitle={chapterTitle}
      vocabs={vocabs}
      vocabIdx={vocabIdx}
      onVocabIdxChange={setVocabIdx}
      onComplete={async () => {
        if (onVocabComplete) {
          try {
            await onVocabComplete();
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : '단어 학습 완료 처리에 실패했습니다.';
            toast.error(message);
            return;
          }
        }

        setChapterPhase('vocab_done');
      }}
      onBack={onBack}
      indicatorSteps={chapterIndicatorSteps}
    />
  );
}
