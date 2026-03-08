import { useEffect, useMemo, useState } from 'react';

import QuizHeader from '@/components/common/QuizHeader';
import QuizIndicator from '@/components/features/quiz/QuizIndicator';
import QuizImage from '@/components/features/quiz/QuizImage';
import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';
import type { QuizMetric, QuizPhase, StepIndicatorInfo } from './quiz.types';
import QuizPassagePhase from './phases/QuizPassagePhase';
import QuizChoicesPhase from './phases/QuizChoicesPhase';
import QuizResultPhase from './phases/QuizResultPhase';

type QuizPlayerProps = {
  questions: ChoiceQuestionItem[];
  headerTitle?: string;
  onBack?: () => void;
  onComplete?: (total: number, correct: number) => void;
  indicatorSteps?: StepIndicatorInfo[];
  onCurrentIndexChange?: (index: number) => void;
  onMetricsChange?: (metrics: QuizMetric[]) => void;
};

export default function QuizPlayer({
  questions,
  headerTitle,
  onBack,
  onComplete,
  indicatorSteps: externalIndicatorSteps,
  onCurrentIndexChange,
  onMetricsChange,
}: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<QuizPhase>('passage');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [metrics, setMetrics] = useState<QuizMetric[]>(
    Array(questions.length).fill('none')
  );
  const [seenPassages, setSeenPassages] = useState<Set<number>>(new Set());

  if (questions.length === 0) {
    return (
      <main className="flex h-full min-h-0 items-center justify-center bg-white text-slate-900">
        <p className="text-sm text-slate-400">문제 데이터가 없습니다.</p>
      </main>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedIndex = selectedChoice === '' ? -1 : Number(selectedChoice);
  const isCorrect =
    selectedIndex !== -1 && selectedIndex === currentQuestion.correctIndex;
  const isLastQuestion = currentIndex === questions.length - 1;

  const localIndicatorSteps: StepIndicatorInfo[] = useMemo(
    () =>
      questions.map((question, index) => ({
        type: question.type ?? 'quiz',
        status: metrics[index],
        isCurrent: index === currentIndex,
      })),
    [questions, metrics, currentIndex]
  );

  const indicatorSteps = externalIndicatorSteps ?? localIndicatorSteps;

  useEffect(() => {
    onCurrentIndexChange?.(currentIndex);
  }, [currentIndex, onCurrentIndexChange]);

  useEffect(() => {
    onMetricsChange?.(metrics);
  }, [metrics, onMetricsChange]);

  const handleSolve = () => {
    if (currentQuestion.passageMode === 'conversation') {
      setSeenPassages((prev) => new Set(prev).add(currentIndex));
    }
    setPhase('choices');
  };

  const handleGoPassage = () => {
    setPhase('passage');
    setSelectedChoice('');
  };

  const handleCheckAnswer = (selectedIndex?: number) => {
    const resolvedIndex =
      selectedIndex !== undefined ? selectedIndex : Number(selectedChoice);

    if (Number.isNaN(resolvedIndex)) return;

    const correct = resolvedIndex === currentQuestion.correctIndex;

    setSelectedChoice(String(resolvedIndex));
    setMetrics((prev) => {
      const next = [...prev];
      next[currentIndex] = correct ? 'correct' : 'incorrect';
      return next;
    });
    setPhase('checking');
  };

  useEffect(() => {
    if (phase !== 'checking') return;

    const timer = window.setTimeout(() => {
      setPhase('result');
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleNext = () => {
    if (isLastQuestion) {
      const correctCount = metrics.filter((m) => m === 'correct').length;
      onComplete?.(questions.length, correctCount);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedChoice('');
    setPhase('passage');
  };

  return (
    <main className="flex h-full min-h-0 flex-col bg-white text-slate-900">
      <QuizHeader
        title={headerTitle ?? '객관식 퀴즈'}
        showCloseButton={!!onBack}
        onCloseClick={onBack}
      />

      <QuizIndicator steps={indicatorSteps} />

      {phase === 'passage' && (
        <>
          <QuizImage
            src={currentQuestion.imageUrl}
            alt={currentQuestion.imageAlt}
          />
          <QuizPassagePhase
            question={currentQuestion}
            currentIndex={currentIndex}
            skipConversationAnimation={seenPassages.has(currentIndex)}
            onSolve={handleSolve}
          />
        </>
      )}

      {(phase === 'choices' || phase === 'checking') && (
        <QuizChoicesPhase
          question={currentQuestion}
          currentIndex={currentIndex}
          selectedChoice={selectedChoice}
          isChecking={phase === 'checking'}
          onSelectChoice={setSelectedChoice}
          onCheckAnswer={() => handleCheckAnswer()}
          onCheckAnswerWithIndex={handleCheckAnswer}
          onPrevious={handleGoPassage}
        />
      )}

      {phase === 'result' && (
        <QuizResultPhase
          question={currentQuestion}
          selectedChoice={selectedChoice}
          isCorrect={isCorrect}
          isLastQuestion={isLastQuestion}
          onNext={handleNext}
        />
      )}
    </main>
  );
}
