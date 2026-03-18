import { Button } from '@/components/ui/button';
import type { DashboardCategory } from './dashboard.types';

type DashboardCategoryCardProps = {
  category: DashboardCategory;
  onClick?: (category: DashboardCategory) => void;
};

export default function DashboardCategoryCard({
  category,
  onClick,
}: DashboardCategoryCardProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="flex h-auto flex-col items-start rounded-[28px] border-2 border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-slate-300 active:scale-95"
      onClick={() => onClick?.(category)}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl">
        {category.emoji}
      </div>

      <div className="w-full text-left">
        <p className="mb-1 text-[15px] font-bold leading-tight text-slate-900">
          {category.name}
        </p>
        <p className="text-xs font-medium text-slate-400">
          {category.chapterCount}개 챕터
        </p>
      </div>
    </Button>
  );
}
