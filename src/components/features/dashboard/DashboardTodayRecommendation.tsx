import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DashboardRecommendation } from './dashboard.types';
import DashboardTodayRecommendationHeroCard from './DashboardTodayRecommendationHeroCard.tsx';

type DashboardTodayRecommendationProps = {
  recommendations: DashboardRecommendation[];
  onRecommendationClick: (recommendation: DashboardRecommendation) => void;
  showHeader?: boolean;
  showHeroCard?: boolean;
  showAlternative?: boolean;
};

export default function DashboardTodayRecommendation({
  recommendations,
  onRecommendationClick,
  showHeader = true,
  showHeroCard = true,
  showAlternative = true,
}: DashboardTodayRecommendationProps) {
  const firstRec = recommendations[0];
  const secondRec = recommendations[1];

  if (!firstRec && !secondRec) return null;

  return (
    <section className="mb-8 mt-12">
      {showHeader && (
        <div className="mb-6 flex items-center gap-2 px-1">
          <Sparkles className="h-5 w-5 fill-slate-900 text-slate-900" />
          <h3 className="text-lg font-bold tracking-tight text-slate-900">
            오늘의 추천 학습👇
          </h3>
        </div>
      )}

      {showHeroCard && firstRec && (
        <DashboardTodayRecommendationHeroCard
          recommendation={firstRec}
          onClick={() => onRecommendationClick(firstRec)}
        />
      )}

      {showAlternative && secondRec && (
        <Button
          type="button"
          variant="outline"
          className="group mt-5 flex h-auto w-full items-center justify-between rounded-3xl border-2 border-dashed border-slate-200 bg-white px-6 py-5 shadow-sm hover:border-slate-300"
          onClick={() => onRecommendationClick(secondRec)}
        >
          <span className="text-sm font-bold text-slate-500 transition-colors group-hover:text-slate-900">
            다른 추천: {secondRec.title}
          </span>
          <ArrowRight
            size={18}
            className="text-slate-200 transition-colors group-hover:text-slate-400"
          />
        </Button>
      )}
    </section>
  );
}
