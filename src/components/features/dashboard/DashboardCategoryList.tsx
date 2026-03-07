import type { DashboardCategory } from './dashboard.types';
import DashboardCategoryCard from './DashboardCategoryCard';

type DashboardCategoryListProps = {
  categories: DashboardCategory[];
  onCategoryClick?: (category: DashboardCategory) => void;
};

export default function DashboardCategoryList({
  categories,
  onCategoryClick,
}: DashboardCategoryListProps) {
  return (
    <article className="mt-12">
      <div className="mb-6 px-1">
        <h3 className="text-lg font-bold tracking-tight text-slate-900">
          분야별 지식 쌓기 📚
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-500">
          관심 있는 분야를 골라 공부를 시작해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.slice(0, 4).map((category) => (
          <DashboardCategoryCard
            key={category.name}
            category={category}
            onClick={onCategoryClick}
          />
        ))}
      </div>
    </article>
  );
}
