import { useState } from 'react';

import QuizFooter from '@/components/common/QuizFooter';
import { cn } from '@/lib/utils';
import QuizTitle from '../shared/QuizTitle';

type OXChoiceViewProps = {
  questionNumber: number;
  questionTitle: string;
  /** 정답 인덱스: 0 = O, 1 = X */
  correctIndex?: number;
  onCheckAnswer: (selectedIndex: number) => void;
  isChecking?: boolean;
  onPrevious?: () => void;
};

export default function OXChoiceView({
  questionNumber,
  questionTitle,
  correctIndex,
  onCheckAnswer,
  isChecking = false,
  onPrevious,
}: OXChoiceViewProps) {
  const [selected, setSelected] = useState<0 | 1 | null>(null);
  const isCtaEnabled = selected !== null && !isChecking;

  const handleSelect = (value: 0 | 1) => {
    if (isChecking) return;
    setSelected(value);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    onCheckAnswer(selected);
  };

  const getButtonState = (value: 0 | 1) => {
    if (!isChecking) {
      return selected === value ? 'selected' : 'idle';
    }

    const isSelected = selected === value;
    const isAnswer = value === correctIndex;

    if (isSelected) {
      return isAnswer ? 'correct' : 'wrong';
    }

    return 'dim';
  };

  const buttonConfig = {
    idle: {
      container: 'bg-white border-slate-200 text-slate-400',
    },
    selected: {
      container: 'border-slate-900 text-slate-900 bg-white scale-[1.02]',
    },
    correct: {
      container:
        'border-green-500 bg-green-50 text-green-600 scale-[1.05] shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 ease-out z-10',
    },
    wrong: {
      container:
        'border-red-500 bg-red-50 text-red-500 scale-[1.05] shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300 ease-out z-10',
    },
    dim: {
      container: 'border-slate-100 bg-slate-50 text-slate-300',
    },
  } as const;

  const renderButton = (value: 0 | 1, label: 'O' | 'X') => {
    const state = getButtonState(value);
    const cfg = buttonConfig[state];
    const isO = label === 'O';

    return (
      <button
        key={value}
        type="button"
        disabled={isChecking}
        onClick={() => handleSelect(value)}
        className={cn(
          'flex flex-1 cursor-pointer select-none flex-col items-center justify-center gap-3 rounded-2xl border-2 transition-all duration-200',
          cfg.container,
          isChecking && 'cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'text-7xl font-black leading-none',
            isO ? 'text-emerald-400' : 'text-red-400',
            state === 'selected' && (isO ? 'text-emerald-500' : 'text-red-500'),
            state === 'correct' && (isO ? 'text-emerald-600' : 'text-red-600'),
            state === 'wrong' && 'text-current',
            state === 'dim' && 'opacity-30'
          )}
        >
          {label}
        </span>

        <span className="text-xs font-medium text-current opacity-70">
          {isO ? '맞다' : '아니다'}
        </span>
      </button>
    );
  };

  return (
    <>
      <section className="flex flex-1 flex-col overflow-hidden px-6">
        <QuizTitle questionNumber={questionNumber} questionTitle={questionTitle} />

        <div className="flex flex-1 gap-4 pb-4">
          {renderButton(0, 'O')}
          {renderButton(1, 'X')}
        </div>
      </section>

      <QuizFooter
        disabled={!isCtaEnabled}
        previousDisabled={isChecking}
        onClick={handleConfirm}
        onPrevious={onPrevious}
      >
        정답 확인
      </QuizFooter>
    </>
  );
}
