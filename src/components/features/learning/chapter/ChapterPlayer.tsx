import { useMemo, useState } from 'react';

import QuizPlayer from '@/components/features/learning/quiz/QuizPlayer';
import WordCardsPlayer from './word/WordCardsPlayer';
import ChapterDone from './ChapterDone';
import ChapterResult from './ChapterResult';

import type { ChoiceQuestionSet } from '@/mock/choiceQuestion';
import type {
  QuizMetric,
  StepIndicatorInfo,
} from '@/components/features/learning/quiz/quiz.types';

type ChapterPhase = 'words' | 'quiz' | 'done' | 'final';

type ChapterPlayerProps = {
  questionSet: ChoiceQuestionSet;
  onComplete: (total: number, correct: number) => void;
  onBack: () => void;
};

export default function ChapterPlayer({
  questionSet,
  onComplete,
  onBack,
}: ChapterPlayerProps) {
  const wordQuestions = useMemo(
    () => questionSet.questions.filter((q) => q.type === 'word'),
    [questionSet]
  );

  const quizQuestions = useMemo(
    () => questionSet.questions.filter((q) => q.type === 'quiz'),
    [questionSet]
  );

  const initialPhase: ChapterPhase =
    wordQuestions.length > 0 ? 'words' : 'quiz';

  const [chapterPhase, setChapterPhase] = useState<ChapterPhase>(initialPhase);
  const [quizResult, setQuizResult] = useState<{
    total: number;
    correct: number;
  } | null>(null);

  const [wordIdx, setWordIdx] = useState(0);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);
  const [quizMetrics, setQuizMetrics] = useState<QuizMetric[]>(
    Array(quizQuestions.length).fill('none')
  );

  const combinedSteps: StepIndicatorInfo[] = useMemo(() => {
    const wordSteps: StepIndicatorInfo[] = wordQuestions.map((_, idx) => ({
      type: 'word',
      status: 'none',
      isCurrent: chapterPhase === 'words' && idx === wordIdx,
    }));

    const quizSteps: StepIndicatorInfo[] = quizQuestions.map((q, idx) => ({
      type: q.type ?? 'quiz',
      status: chapterPhase === 'words' ? 'none' : quizMetrics[idx],
      isCurrent: chapterPhase === 'quiz' && idx === quizCurrentIndex,
    }));

    return [...wordSteps, ...quizSteps];
  }, [
    wordQuestions,
    quizQuestions,
    chapterPhase,
    wordIdx,
    quizCurrentIndex,
    quizMetrics,
  ]);

  if (chapterPhase === 'final' && quizResult) {
    return (
      <ChapterResult
        correct={quizResult.correct}
        total={quizResult.total}
        chapterTitle={questionSet.title}
        onFinish={() => onComplete(quizResult.total, quizResult.correct)}
      />
    );
  }

  if (chapterPhase === 'done' && quizResult) {
    return (
      <ChapterDone
        correct={quizResult.correct}
        total={quizResult.total}
        chapterTitle={questionSet.title}
        onFinish={() => setChapterPhase('final')}
      />
    );
  }

  if (chapterPhase === 'quiz') {
    return (
      <QuizPlayer
        questions={quizQuestions}
        onBack={
          wordQuestions.length > 0 ? () => setChapterPhase('words') : onBack
        }
        onComplete={(total, correct) => {
          setQuizResult({ total, correct });
          setChapterPhase('done');
        }}
        indicatorSteps={combinedSteps}
        onCurrentIndexChange={setQuizCurrentIndex}
        onMetricsChange={setQuizMetrics}
      />
    );
  }

  return (
    <WordCardsPlayer
      words={wordQuestions}
      wordIdx={wordIdx}
      onWordIdxChange={setWordIdx}
      onComplete={() => setChapterPhase('quiz')}
      onBack={onBack}
      indicatorSteps={combinedSteps}
    />
  );
}
