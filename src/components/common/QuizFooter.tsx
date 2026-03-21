import type { ReactNode } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type QuizFooterProps = {
  disabled?: boolean;
  previousDisabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  onPrevious?: () => void;
  showTrailingIcon?: boolean;
};

export default function QuizFooter({
  disabled = false,
  previousDisabled = false,
  onClick,
  children,
  onPrevious,
  showTrailingIcon = true,
}: QuizFooterProps) {
  const hasPrevious = Boolean(onPrevious);

  return (
    <footer className="flex shrink-0 gap-3 bg-card px-5 pb-8 pt-4">
      {hasPrevious && onPrevious && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-14 w-14 shrink-0 rounded-2xl bg-slate-100 text-slate-900 shadow-none hover:bg-slate-200"
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          <ArrowLeft className="h-6 w-6" strokeWidth={2.2} />
          <span className="sr-only">이전</span>
        </Button>
      )}

      <Button
        type="button"
        disabled={disabled}
        className={cn(
          'relative h-14 rounded-2xl bg-primary text-base font-semibold text-slate-950 shadow-none hover:bg-primary/90',
          hasPrevious ? 'flex-1' : 'w-full'
        )}
        onClick={onClick}
      >
        {children}
        {showTrailingIcon ? (
          <ChevronRight
            className="absolute right-4 size-6"
            strokeWidth={2.2}
          />
        ) : null}
      </Button>
    </footer>
  );
}
