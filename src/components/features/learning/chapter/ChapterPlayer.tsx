import { useMemo, useState } from 'react';

import QuizPlayer from '@/components/features/learning/quiz/QuizPlayer';
import ChapterDone from './ChapterDone';
import ChapterResult from './ChapterResult';
import ChapterIntro from './ChapterIntro';
import VocabDone from './VocabDone';

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
  title: string;
  prologueSubtitle: string;
  goal: string;
  description: string;
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
  onSubmitQuiz?: (
    quizId: number,
    selectedAnswer: string
  ) => Promise<QuizSubmitResponse>;
  onFetchResult?: () => Promise<ChapterResultResponse>;
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

  const [chapterPhase, setChapterPhase] = useState<ChapterPhase>(initialPhase);
  const [quizResult, setQuizResult] = useState<ChapterResultResponse | null>(null);

  const [vocabIdx, setVocabIdx] = useState(0);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(
    initialQuizSequence && initialQuizSequence > 0 ? initialQuizSequence - 1 : 0
  );
  const [quizMetrics, setQuizMetrics] = useState<QuizMetric[]>(
    Array(quizzes.length).fill('none')
  );

  const combinedSteps: StepIndicatorInfo[] = useMemo(() => {
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
  }, [
    vocabs,
    quizzes,
    chapterPhase,
    vocabIdx,
    quizCurrentIndex,
    quizMetrics,
  ]);

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
        onBack={onBack}
        onComplete={(total, correct) => {
          if (onFetchResult) {
            onFetchResult()
              .then((result) => {
                setQuizResult(result);
                setChapterPhase('done');
              })
              .catch(() => {
                const fallbackAccuracyRate =
                  total > 0 ? Math.round((correct / total) * 100) : 0;

                setQuizResult({
                  correctCount: correct,
                  totalCount: total,
                  accuracyRate: fallbackAccuracyRate,
                  earnedBytes: 0,
                });
                setChapterPhase('done');
              });
            return;
          }

          setQuizResult({
            correctCount: correct,
            totalCount: total,
            accuracyRate: total > 0 ? Math.round((correct / total) * 100) : 0,
            earnedBytes: 0,
          });
          setChapterPhase('done');
        }}
        indicatorSteps={combinedSteps}
        onCurrentIndexChange={setQuizCurrentIndex}
        onMetricsChange={setQuizMetrics}
        initialIndex={quizCurrentIndex}
        onSubmitAnswer={
          onSubmitQuiz
            ? async (question, selectedAnswerIndex) => {
                const quizId = question.quizId;
                const selectedAnswer =
                  question.specificData?.options?.[selectedAnswerIndex] ?? '';
                if (!quizId || typeof selectedAnswer !== 'string') {
                  throw new Error('퀴즈 제출에 필요한 데이터가 올바르지 않습니다.');
                }
                return onSubmitQuiz(quizId, selectedAnswer);
              }
            : undefined
        }
      />
    );
  }

  if (chapterPhase === 'intro') {
    return (
      <ChapterIntro
        chapterTitle={chapterIntro.title}
        prologueSubtitle={chapterIntro.prologueSubtitle}
        chapterGoal={chapterIntro.goal}
        chapterDescription={chapterIntro.description}
        coreKeywords={chapterIntro.coreKeywords}
        shouldResume={
          initialStatus === 'QUIZ_IN_PROGRESS' ||
          (initialQuizSequence !== null && initialQuizSequence > 1)
        }
        onBack={onBack}
        onStart={() => {
          if (initialStatus === 'QUIZ_IN_PROGRESS') {
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
        vocabCount={vocabs.length}
        onClose={onBack}
        onStartQuiz={() => setChapterPhase('quiz')}
      />
    );
  }

  return (
    <VocabCardsPlayer
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
      indicatorSteps={combinedSteps}
    />
  );
}
