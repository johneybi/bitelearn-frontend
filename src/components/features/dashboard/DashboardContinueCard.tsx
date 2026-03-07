import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DashboardContinueCardProps = {
  onContinue: () => void;
  category: string;
  chapterTitle: string;
  meta: string;
  progressPercent?: number | null;
};

export default function DashboardContinueCard({
  onContinue,
  category,
  chapterTitle,
  meta,
  progressPercent = null,
}: DashboardContinueCardProps) {
  return (
    <article className="rounded-[32px] border-2 border-slate-100 bg-slate-50/50 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between px-1">
        <h3 className="text-base font-bold tracking-tight text-slate-900">
          마지막으로 공부하던 곳이에요 🚩
        </h3>
      </div>

      <div className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-white p-4 shadow-inner">
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="text-xs font-bold text-slate-400">{category}</p>
          <p className="truncate text-base font-bold leading-tight text-slate-900">
            {chapterTitle}
          </p>
          <p className="text-xs font-medium text-slate-500">{meta}</p>
        </div>

        <Button
          size="icon"
          variant="default"
          className="h-12 w-12 shrink-0 rounded-full bg-slate-900 text-white shadow-lg shadow-slate-200 transition-all active:scale-90"
          onClick={onContinue}
          aria-label="학습 이어하기"
        >
          <Play size={20} className="ml-1 fill-white" />
        </Button>
      </div>

      {progressPercent !== null && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/50">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{ width: `${Math.max(0, Math.min(progressPercent, 100))}%` }}
          />
        </div>
      )}
    </article>
  );
}
