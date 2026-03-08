import { useEffect, useMemo, useState } from 'react';

import QuizHeader from '@/components/common/QuizHeader';
import QuizIndicator from '@/components/features/quiz/QuizIndicator';
import QuizImage from '@/components/features/quiz/QuizImage';
import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';
import type { QuizPhase, StepIndicatorInfo } from './quiz.types';
import TextPassageView from './passage/TextPassageView';
import MultipleChoiceView from './choices/MultipleChoiceView';
import ChoiceResultView from './result/ChoiceResultView';
import OXChoiceView from './choices/OXChoiceView';
import ConversationPassageView from './passage/ConversationPassageView';

type QuizPlayerProps = {
  questions: ChoiceQuestionItem[];
  headerTitle?: string;
  onBack?: () => void;
  onComplete?: (total: number, correct: number) => void;
};

export default function QuizPlayer({
  questions,
  headerTitle,
  onBack,
  onComplete,
}: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<QuizPhase>('passage');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [metrics, setMetrics] = useState<('none' | 'correct' | 'incorrect')[]>(
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

  const indicatorSteps: StepIndicatorInfo[] = useMemo(
    () =>
      questions.map((question, index) => ({
        type: question.type ?? 'quiz',
        status: metrics[index],
        isCurrent: index === currentIndex,
      })),
    [questions, metrics, currentIndex]
  );

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

      <QuizImage
        src={currentQuestion.imageUrl}
        alt={currentQuestion.imageAlt}
      />

      {phase === 'passage' &&
        (currentQuestion.passageMode === 'conversation' ? (
          <ConversationPassageView
            question={currentQuestion}
            onSolve={handleSolve}
            skipAnimation={seenPassages.has(currentIndex)}
          />
        ) : (
          <TextPassageView question={currentQuestion} onSolve={handleSolve} />
        ))}

      {(phase === 'choices' || phase === 'checking') &&
        (currentQuestion.choiceMode === 'ox' ? (
          <OXChoiceView
            key={currentQuestion.questionNumber}
            questionNumber={currentQuestion.questionNumber}
            question={currentQuestion.question}
            correctIndex={currentQuestion.correctIndex}
            onCheckAnswer={handleCheckAnswer}
            isChecking={phase === 'checking'}
            onPrevious={handleGoPassage}
          />
        ) : (
          <MultipleChoiceView
            questionNumber={currentQuestion.questionNumber}
            question={currentQuestion.question}
            choices={currentQuestion.choices}
            selectedValue={selectedChoice}
            onSelectChoice={setSelectedChoice}
            onCheckAnswer={handleCheckAnswer}
            isChecking={phase === 'checking'}
            correctIndex={currentQuestion.correctIndex}
            onPrevious={handleGoPassage}
          />
        ))}

      {phase === 'result' && (
        <ChoiceResultView
          isCorrect={isCorrect}
          correctAnswerText={
            currentQuestion.choices[currentQuestion.correctIndex] ?? ''
          }
          selectedAnswerText={
            selectedIndex !== -1
              ? (currentQuestion.choices[selectedIndex] ?? '')
              : ''
          }
          explanation={currentQuestion.explanation}
          characterImageUrl={
            isCorrect
              ? currentQuestion.characterCorrectImageUrl ||
                '/images/result/dog_perfect.png'
              : currentQuestion.characterIncorrectImageUrl ||
                '/images/result/dog_fail.png'
          }
          isLastQuestion={isLastQuestion}
          onNext={handleNext}
        />
      )}
    </main>
  );
}
