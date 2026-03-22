import { useMeQuery } from '@/api/auth/auth.query';

import DashboardArticle from '@/components/features/dashboard/DashboardArticle';
import DashboardTodayRecommendation from '@/components/features/dashboard/DashboardTodayRecommendation';
import GuestHeroSection from '@/components/features/dashboard/GuestHeroSection';
import HomeLogoHeader from '@/components/features/dashboard/HomeLogoHeader';
import MemberHeroSection from '@/components/features/dashboard/MemberHeroSection';
import type { DashboardRecommendation } from '@/components/features/dashboard/dashboard.types';
import { mockArticles } from '@/mock/article';
import { formatDisplayName } from '@/utils/formatUser';

function HomePage() {
  const { data: user } = useMeQuery();

  // 현재 레벨 (임시)
  const currentLevel = 1;

  // 최근 학습 데이터 (임시)
  const recentLearning = {
    categoryId: 'real-estate',
    chapterId: '1',
    categoryName: '부동산 · 주거',
    topicName: '월세',
    chapterTitle: '아주 길고 길고 길고 긴 챕터이름',
    progressPercent: 68,
  };

  // 추천 학습 데이터 (임시)
  const dashboardRecommendations: DashboardRecommendation[] = [
    {
      categoryId: 'real-estate',
      chapterId: '2',
      categoryName: '부동산 · 주거',
      topicName: '전세',
      chapterTitle: '전세 계약 전 꼭 확인해야 할 체크리스트',
    },
    {
      categoryId: 'finance',
      chapterId: '1',
      categoryName: '생활금융 · 고용',
      topicName: '월급',
      chapterTitle: '사회초년생을 위한 월급 관리 기초',
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HomeLogoHeader />

      <section className="hide-scrollbar flex-1 overflow-y-auto bg-background pb-40 pt-[60px]">
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
