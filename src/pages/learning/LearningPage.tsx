import { useNavigate } from 'react-router-dom';

import CategoryCard from '@/components/features/learning/CategoryCard';
import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';

export default function LearningPage() {
  const navigate = useNavigate();

  const totalDomains = MOCK_CATEGORY_CHAPTERS.length;
  const startedDomains = MOCK_CATEGORY_CHAPTERS.filter(
    (category) => category.completedChapters > 0
  ).length;

  const handleSelectCategory = (categoryId: string) => {
    navigate(`/learning/${categoryId}`);
  };

  return (
    <div className="flex h-full flex-col bg-white text-slate-900">
      <header className="shrink-0 border-b border-slate-50 bg-white px-6 pb-8 pt-12">
        <div className="flex items-end justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            학습 카테고리
          </h1>

          <div className="text-right">
            <span className="text-2xl font-bold leading-none text-slate-900">
              {startedDomains}
              <span className="mx-1 text-slate-300">/</span>
              {totalDomains}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <div className="h-1 w-6 rounded-full bg-slate-900" />
          <p className="text-sm font-medium text-slate-500">
            관심 있는 분야를 골라 가볍게 시작해보세요.
          </p>
        </div>
      </header>

      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-10">
          {MOCK_CATEGORY_CHAPTERS.map((cat) => (
            <CategoryCard
              key={cat.categoryId}
              cat={cat}
              onSelect={() => handleSelectCategory(cat.categoryId)}
            />
          ))}
        </div>

        <div className="mt-20 px-8 pb-32 text-center">
          <p className="text-xs font-bold leading-relaxed text-slate-300">
            새로운 학습 분야가 계속 추가될 예정이에요
          </p>
        </div>
      </section>
    </div>
  );
}
