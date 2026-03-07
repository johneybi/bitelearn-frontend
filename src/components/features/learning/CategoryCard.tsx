import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { CategoryChapters } from '@/mock/chapter';

type CategoryCardProps = {
  cat: CategoryChapters;
  onSelect: () => void;
};

export default function CategoryCard({ cat, onSelect }: CategoryCardProps) {
  const progress = Math.round(
    (cat.completedChapters / cat.totalChapters) * 100
  );
  const isComplete = cat.completedChapters === cat.totalChapters;

  return (
    <Button
      variant="outline"
      onClick={onSelect}
      className="flex h-auto w-full flex-col items-start gap-6 rounded-[24px] border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:bg-white active:scale-[0.98]"
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-3xl">
            {cat.emoji}
          </div>

          <div className="text-left">
            <h3 className="text-lg font-bold leading-tight text-slate-900">
              {cat.categoryName}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {cat.tagline}
            </p>
          </div>
        </div>

        {isComplete && (
          <div className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
            완료
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="mb-2 flex items-end justify-between px-1">
          <span className="text-xs font-bold text-slate-400">
            {cat.completedChapters} / {cat.totalChapters} 챕터 완료
          </span>
          <span className="text-sm font-bold text-slate-900">{progress}%</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-center border-t border-slate-50 pt-2">
        <span className="flex items-center gap-1 text-xs font-bold text-slate-300">
          자세히 보기 <ChevronRight size={14} />
        </span>
      </div>
    </Button>
  );
}
