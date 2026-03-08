import { useMemo, useState } from 'react';

import QuizHeader from '@/components/common/QuizHeader';
import QuizIndicator from '@/components/features/quiz/QuizIndicator';
import QuizImage from '@/components/features/quiz/QuizImage';
import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';
import type { QuizMetric, QuizPhase, StepIndicatorInfo } from './quiz.types';
import TextPassageView from './passage/TextPassageView';
import MultipleChoiceView from './choices/MultipleChoiceView';

type QuizPlayerProps = {
  questions: ChoiceQuestionItem[];
  headerTitle?: string;
  onBack?: () => void;
};

export default function QuizPlayer({
  questions,
  headerTitle,
  onBack,
}: QuizPlayerProps) {
  const [currentIndex] = useState(0);
  const [phase, setPhase] = useState<QuizPhase>('passage');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [metrics] = useState<QuizMetric[]>(
    Array(questions.length).fill('none')
  );

  if (questions.length === 0) {
    return (
      <main className="flex h-full min-h-0 items-center justify-center bg-white text-slate-900">
        <p className="text-sm text-slate-400">문제 데이터가 없습니다.</p>
      </main>
    );
  }

  const currentQuestion = questions[currentIndex];

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

    setSelectedChoice(String(resolvedIndex));
    setPhase('checking');
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

      {phase === 'passage' && (
        <TextPassageView question={currentQuestion} onSolve={handleSolve} />
      )}

      {(phase === 'choices' || phase === 'checking') && (
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
      )}
    </main>
  );
}
