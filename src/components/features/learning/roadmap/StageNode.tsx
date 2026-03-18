import { Check, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { LearningChapterListItem } from '@/api/learning/learning.types';
import { cn } from '@/lib/utils';

type StageNodeProps = {
  chapter: LearningChapterListItem;
  index: number;
  onSelect: () => void;
};

export default function StageNode({
  chapter,
  index,
  onSelect,
}: StageNodeProps) {
  const isCompleted = chapter.status === 'COMPLETED';
  const isInProgress = chapter.status === 'QUIZ_IN_PROGRESS';
  const isLocked = chapter.isLocked ?? false;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 260,
        damping: 22,
      }}
    >
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
          <span className="text-2xl font-extrabold text-slate-700">
            {chapter.sequence}
          </span>
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
      </div>
    </motion.div>
  );
}
