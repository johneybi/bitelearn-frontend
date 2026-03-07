import { Check, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Chapter } from '@/mock/chapter';
import { cn } from '@/lib/utils';

type StageNodeProps = {
  chapter: Chapter;
  index: number;
  onSelect: () => void;
};

const OFFSETS = ['-30px', '0px', '30px', '0px'];

export default function StageNode({
  chapter,
  index,
  onSelect,
}: StageNodeProps) {
  const isCompleted = chapter.status === 'completed';
  const isInProgress = chapter.status === 'in_progress';
  const isLocked = chapter.status === 'locked';

  const xOffset = OFFSETS[index % OFFSETS.length];

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ transform: `translateX(${xOffset})` }}
    >
      <div className="relative flex flex-col items-center">
        <Button
          disabled={isLocked}
          onClick={onSelect}
          variant={isInProgress ? 'default' : 'outline'}
          className={cn(
            'relative z-10 flex h-20 w-20 items-center justify-center rounded-[28px] border-2 shadow-sm transition-all active:scale-95',
            isCompleted && 'border-slate-900 bg-slate-900 text-white',
            isInProgress && 'border-slate-900 bg-white ring-4 ring-slate-100',
            isLocked && 'border-slate-200 bg-slate-50 text-slate-300',
            !isCompleted &&
              !isInProgress &&
              !isLocked &&
              'border-slate-200 bg-white'
          )}
        >
          {isCompleted ? (
            <Check size={32} strokeWidth={3} />
          ) : isLocked ? (
            <Lock size={20} />
          ) : (
            <span className="text-3xl">{chapter.emoji}</span>
          )}

          {isInProgress && (
            <div className="absolute -right-1 -top-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
              진행 중
            </div>
          )}
        </Button>

        <div className="mt-3 max-w-[120px] text-center">
          <p
            className={`text-xs font-bold leading-tight ${
              isLocked ? 'text-slate-400' : 'text-slate-900'
            }`}
          >
            {chapter.title}
          </p>

          {!isLocked && (
            <p className="mt-1 text-xs font-medium text-slate-400">
              약 {chapter.estimatedMinutes}분 · {chapter.questionCount}문제
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
