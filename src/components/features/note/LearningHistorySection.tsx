import { ChevronRight, GraduationCap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { CategoryChapters } from '@/mock/chapter';

type LearningHistorySectionProps = {
  categories: CategoryChapters[];
};

export default function LearningHistorySection({
  categories,
}: LearningHistorySectionProps) {
  return (
    <div className="space-y-8">
      <h3 className="mb-4 px-1 text-sm font-bold text-slate-400">
        최근 학습 활동
      </h3>

      <div className="space-y-10">
        {categories.map((category) => {
          const progress = Math.round(
            (category.completedChapters / category.totalChapters) * 100
          );

          return (
            <div key={category.categoryId} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-2xl">
                {category.emoji}
              </div>

              <div className="flex-1">
                <div className="mb-2 flex items-end justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    {category.categoryName}
                  </h4>

                  <span className="text-xs font-bold text-slate-400">
                    {category.completedChapters} / {category.totalChapters}
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-[32px] bg-slate-900 p-6 text-white shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <GraduationCap size={24} className="text-slate-400" />
          <h4 className="text-lg font-bold">성장 가이드</h4>
        </div>

        <p className="text-sm font-medium leading-relaxed text-slate-400">
          부동산 도메인의 모든 챕터를 완료하면
          <br />
          '프로 독립러' 뱃지를 획득할 수 있어요!
        </p>

        <Button
          variant="secondary"
          className="mt-6 h-12 w-full rounded-xl border-none bg-white/10 text-xs font-bold text-white transition-all hover:bg-white/20"
        >
          다음 미션 확인하기
          <ChevronRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
