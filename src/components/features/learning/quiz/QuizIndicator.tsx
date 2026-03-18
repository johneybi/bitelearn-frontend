import { cn } from '@/lib/utils';
import type { StepIndicatorInfo } from './quiz.types';

type QuizIndicatorProps = {
  steps: StepIndicatorInfo[];
};

export default function QuizIndicator({ steps }: QuizIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 px-6 py-4">
      {steps.map((step, index) => {
        let bgColor = 'bg-slate-200';

        if (step.type === 'vocab') {
          bgColor = 'bg-blue-500'; // 학습 단계: 파란색
        } else if (step.type === 'quiz') {
          if (step.status === 'correct') {
            bgColor = 'bg-emerald-500'; // 정답: 녹색
          } else if (step.status === 'incorrect') {
            bgColor = 'bg-rose-500'; // 오답: 빨간색
          } else if (step.isCurrent) {
            bgColor = 'bg-slate-400'; // 현재 풀고 있는 문제 (아직 미제출)
          }
        }

        const currentClass = step.isCurrent
          ? 'w-2 h-2 ring-4 ring-slate-100 shadow-sm'
          : 'w-1.5 h-1.5 opacity-60';

        return (
          <div
            key={index}
            className={cn(
              'rounded-full transition-all duration-300',
              bgColor,
              currentClass
            )}
          />
        );
      })}
    </div>
  );
}
