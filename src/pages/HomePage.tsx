import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMe } from '@/api/auth/auth.api';
import type { MeResponse } from '@/api/auth/auth.types';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';
import DashboardHeader from '@/components/features/dashboard/DashboardHeader';
import { getDashboardHeaderContent } from '@/components/features/dashboard/getDashboardHeaderContent';
import DashboardContinueCard from '@/components/features/dashboard/DashboardContinueCard';
import { getDashboardContinueCardContent } from '@/components/features/dashboard/getDashboardContinueCardContent';
import DashboardCategoryList from '@/components/features/dashboard/DashboardCategoryList';
import DashboardTodayRecommendation from '@/components/features/dashboard/DashboardTodayRecommendation';
import DashboardArticle from '@/components/features/dashboard/DashboardArticle';
import {
  DASHBOARD_CATEGORIES,
  DASHBOARD_RECOMMENDATIONS,
} from '@/mock/dashboard';
import { mockArticles } from '@/mock/article';

function HomePage() {
  const navigate = useNavigate();

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [user, setUser] = useState<MeResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await getMe();
        setIsOnboardingOpen(!me.isOnboardingCompleted);
        setUser(me);
      } catch (error) {
        console.error('내 정보 조회 실패', error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleOnboardingClose = () => {
    // 온보딩 완료 처리 API 호출
    setIsOnboardingOpen(false);
  };

  const headerContent = getDashboardHeaderContent({
    isLoggedIn: !!user,
    nickname: user?.nickname ?? null,
  });

  const handleProfileClick = () => {
    navigate(user ? '/mypage' : '/login');
  };

  // 최근 학습 데이터 (임시)
  const recentLearning = {
    categoryId: 'real-estate',
    chapterId: 'contract_step2',
    category: '부동산 · 주거',
    chapterTitle: '전세사기 예방 기초',
    progressPercent: 68,
  };

  const shouldShowContinueCard =
    recentLearning != null && recentLearning.progressPercent < 100;

  const continueCardContent = shouldShowContinueCard
    ? getDashboardContinueCardContent(recentLearning)
    : null;

  if (isLoadingUser) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-slate-500">홈 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-28 pt-4">
        <div className="flex flex-col">
          <DashboardHeader
            title={headerContent.title}
            subtitle={headerContent.subtitle}
            profileButtonLabel={headerContent.profileButtonLabel}
            onProfileClick={handleProfileClick}
          />

          <div className="space-y-12">
            {shouldShowContinueCard && continueCardContent && (
              <DashboardContinueCard
                category={continueCardContent.category}
                chapterTitle={continueCardContent.chapterTitle}
                meta={continueCardContent.meta}
                progressPercent={continueCardContent.progressPercent}
                onContinue={() => {
                  navigate(
                    `/learning/${continueCardContent.categoryId}/${continueCardContent.chapterId}`
                  );
                }}
              />
            )}

            <DashboardCategoryList
              categories={DASHBOARD_CATEGORIES}
              onCategoryClick={(category) => {
                navigate(`/learning/${category.id}`);
              }}
            />

            <DashboardTodayRecommendation
              recommendations={DASHBOARD_RECOMMENDATIONS}
              onRecommendationClick={(recommendation) => {
                navigate(
                  `/learning/${recommendation.categoryId}/${recommendation.chapterId}`
                );
              }}
            />

            <DashboardArticle
              articles={mockArticles}
              onMoreClick={() => navigate('/articles')}
              onSelectArticle={(articleId) =>
                navigate(`/articles/${articleId}`)
              }
            />
          </div>
        </div>
      </section>
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleOnboardingClose}
      />
    </div>
  );
}

export default HomePage;
