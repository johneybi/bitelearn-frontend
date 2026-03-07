import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DashboardRecommendation } from './dashboard.types';

type DashboardTodayRecommendationHeroCardProps = {
  recommendation: DashboardRecommendation;
  onClick: () => void;
};

export default function DashboardTodayRecommendationHeroCard({
  recommendation,
  onClick,
}: DashboardTodayRecommendationHeroCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-[36px] border-2 border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-slate-900 active:scale-[0.98]"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
            추천 학습
          </span>
          <span className="text-xs font-bold text-slate-400">
            {recommendation.category}
          </span>
        </div>

        <h4 className="text-xl font-bold leading-tight tracking-tight text-slate-900">
          {recommendation.title}
        </h4>

        <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-5">
          <div className="flex flex-col">
            <p className="text-sm font-bold text-slate-500">
              약 {recommendation.estimatedMinutes}분 소요
            </p>
          </div>

          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full bg-slate-50 text-slate-900 shadow-md transition-all active:scale-90 group-hover:bg-slate-900 group-hover:text-white"
          >
            <ArrowRight size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
