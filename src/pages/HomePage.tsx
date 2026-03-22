import { useMeQuery } from '@/api/auth/auth.query';

import DashboardArticle from '@/components/features/dashboard/DashboardArticle';
import DashboardTodayRecommendation from '@/components/features/dashboard/DashboardTodayRecommendation';
import GuestHeroSection from '@/components/features/dashboard/GuestHeroSection';
import MemberHeroSection from '@/components/features/dashboard/MemberHeroSection';
import type { DashboardRecommendation } from '@/components/features/dashboard/dashboard.types';
import { mockArticles } from '@/mock/article';
import { DASHBOARD_RECOMMENDATIONS } from '@/mock/dashboard';
import { formatDisplayName } from '@/utils/formatUser';

function HomePage() {
  const { data: user } = useMeQuery();

  // 현재 레벨 (임시)
  const currentLevel = 1;

  // 최근 학습 데이터 (임시)
  const recentLearning = {
    categoryId: 'real-estate',
    chapterId: '1002',
    categoryName: '부동산 · 주거',
    topicName: '전세',
    chapterTitle: '등기부등본에서 위험 신호 읽기',
    progressPercent: 68,
  };

  // 추천 학습 데이터 (임시)
  const dashboardRecommendations: DashboardRecommendation[] =
    DASHBOARD_RECOMMENDATIONS;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <section className="hide-scrollbar flex-1 overflow-y-auto bg-background pb-20 pt-[60px]">
        <div className="mb-8 flex flex-col gap-8 px-5 pt-5">
          {user ? (
            <MemberHeroSection
              nickname={user.nickname ? formatDisplayName(user.nickname) : null}
              currentLevel={currentLevel}
              recentLearning={recentLearning}
            />
          ) : (
            <GuestHeroSection />
          )}

          <DashboardTodayRecommendation
            recommendations={dashboardRecommendations}
          />

          <DashboardArticle articles={mockArticles} />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
