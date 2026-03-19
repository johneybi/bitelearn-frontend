import { useEffect, useState } from 'react';

import QuizHeader from '@/components/common/QuizHeader';
import QuizIndicator from '@/components/features/learning/quiz/QuizIndicator';
import type { QuizInfo } from '@/api/learning/learning.types';
import type { QuizMetric, QuizPhase, StepIndicatorInfo } from './quiz.types';
import QuizPassagePhase from './phases/QuizPassagePhase';
import QuizChoicesPhase from './phases/QuizChoicesPhase';
import QuizResultPhase from './phases/QuizResultPhase';
import type { QuizSubmitResponse } from '@/api/learning/learning.types';
import { isAppError } from '@/api/error/appError';
import { logError } from '@/lib/logError';
import { toast } from 'sonner';

type QuizPlayerProps = {
  questions: QuizInfo[];
  startIndex?: number;
  chapterTitle: string;
  onBack: () => void;
  onComplete: () => void;
  indicatorSteps: StepIndicatorInfo[];
  onCurrentIndexChange: (index: number) => void;
  onMetricsChange: (metrics: QuizMetric[]) => void;
  onSubmitAnswer: (
    question: QuizInfo,
    selectedAnswerIndex: number
  ) => Promise<QuizSubmitResponse>;
};

export default function QuizPlayer({
  questions,
  startIndex = 0,
  chapterTitle,
  onBack,
  onComplete,
  indicatorSteps,
  onCurrentIndexChange,
  onMetricsChange,
  onSubmitAnswer,
}: QuizPlayerProps) {
  const safeStartIndex =
    questions.length > 0
      ? Math.max(0, Math.min(startIndex, questions.length - 1))
      : 0;
  const [currentIndex, setCurrentIndex] = useState(safeStartIndex);
  const [phase, setPhase] = useState<QuizPhase>('passage');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [metrics, setMetrics] = useState<QuizMetric[]>(
    Array(questions.length).fill('none')
  );
  const [seenPassages, setSeenPassages] = useState<Set<number>>(new Set());
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [resultByIndex, setResultByIndex] = useState<
    Record<
      number,
      {
        correct: boolean;
        explanation: string;
        correctAnswer: string;
        correctAnswerIndex: number;
      }
    >
  >({});

  if (questions.length === 0) {
    return (
      <main className="flex h-full min-h-0 items-center justify-center bg-white text-slate-900">
        <p className="text-sm text-slate-400">문제 데이터가 없습니다.</p>
      </main>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentChoices = currentQuestion.specificData?.options ?? [];
  const currentResult = resultByIndex[currentIndex];
  const isShowingEvaluation = phase === 'checking' && !isEvaluating;
  const isCorrect = currentResult?.correct ?? false;
  const isLastQuestion = currentIndex === questions.length - 1;
  const resolvedCorrectIndex = currentResult?.correctAnswerIndex ?? -1;

  useEffect(() => {
    onCurrentIndexChange(currentIndex);
  }, [currentIndex, onCurrentIndexChange]);

  useEffect(() => {
    onMetricsChange(metrics);
  }, [metrics, onMetricsChange]);

  const handleSolve = () => {
    if (
      currentQuestion.type === 'DIALOGUE_MCQ' ||
      currentQuestion.type === 'DIALOGUE_OX'
    ) {
      setSeenPassages((prev) => new Set(prev).add(currentIndex));
    }
    setPhase('choices');
  };

  const handleGoPassage = () => {
    setPhase('passage');
    setSelectedChoice('');
  };

  const handleCheckAnswer = async (selectedIndex?: number) => {
    const resolvedIndex =
      selectedIndex !== undefined ? selectedIndex : Number(selectedChoice);

    if (Number.isNaN(resolvedIndex)) return;

    setSelectedChoice(String(resolvedIndex));
    setPhase('checking');
    setIsEvaluating(true);

    let correct = false;
    let explanation = '';
    let correctAnswer = '';

    try {
      const submitResult = await onSubmitAnswer(currentQuestion, resolvedIndex);
      correct = submitResult.correct;
      explanation = submitResult.explanation;
      correctAnswer = submitResult.correctAnswer;
    } catch (error) {
      logError('QuizPlayer', '퀴즈 제출 실패', error);
      setIsEvaluating(false);
      setPhase('choices');
      toast.error(
        isAppError(error)
          ? error.message
          : '답안을 제출하지 못했습니다. 다시 시도해 주세요.'
      );
      return;
    }

    const correctAnswerIndex =
      currentQuestion.type === 'DOC_CLICK'
        ? (currentQuestion.specificData?.documentElements ?? []).findIndex(
            (element) => element.key.trim() === correctAnswer.trim()
          )
        : currentChoices.findIndex(
            (choice) => choice.trim() === correctAnswer.trim()
          );

    setMetrics((prev) => {
      const next = [...prev];
      next[currentIndex] = correct ? 'correct' : 'incorrect';
      return next;
    });
    setResultByIndex((prev) => ({
      ...prev,
      [currentIndex]: {
        correct,
        explanation,
        correctAnswer,
        correctAnswerIndex,
      },
    }));
    setIsEvaluating(false);
  };

  useEffect(() => {
    if (phase !== 'checking' || isEvaluating) return;

    const timer = window.setTimeout(() => {
      setPhase('result');
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [phase, isEvaluating]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedChoice('');
    setPhase('passage');
  };

  return (
    <main className="flex h-full min-h-0 flex-col bg-white text-slate-900">
      <QuizHeader title={chapterTitle} showCloseButton onCloseClick={onBack} />

      <QuizIndicator steps={indicatorSteps} />

      {phase === 'passage' && (
        <QuizPassagePhase
          question={currentQuestion}
          currentIndex={currentIndex}
          skipConversationAnimation={seenPassages.has(currentIndex)}
          onSolve={handleSolve}
        />
      )}

      {(phase === 'choices' || phase === 'checking') && (
        <QuizChoicesPhase
          question={currentQuestion}
          currentIndex={currentIndex}
          correctIndex={resolvedCorrectIndex}
          selectedChoice={selectedChoice}
          isChecking={isShowingEvaluation}
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
          overrideResult={currentResult}
          isLastQuestion={isLastQuestion}
          onNext={handleNext}
        />
      )}
    </main>
  );
}
