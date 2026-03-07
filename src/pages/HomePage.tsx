import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';
import DashboardHeader from '@/components/features/dashboard/DashboardHeader';
import { getDashboardHeaderContent } from '@/components/features/dashboard/getDashboardHeaderContent';
import DashboardContinueCard from '@/components/features/dashboard/DashboardContinueCard';
import { getDashboardContinueCardContent } from '@/components/features/dashboard/getDashboardContinueCardContent';
import DashboardCategoryList from '@/components/features/dashboard/DashboardCategoryList';
import {
  DASHBOARD_CATEGORIES,
  DASHBOARD_RECOMMENDATIONS,
} from '@/mock/dashboard';
import DashboardTodayRecommendation from '@/components/features/dashboard/DashboardTodayRecommendation';

function HomePage() {
  const navigate = useNavigate();

  const DONE_KEY = 'onboarding:done';
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // 온보딩 완료 여부 체크
  useEffect(() => {
    const done = localStorage.getItem(DONE_KEY) === '1';

    if (!done) {
      setIsOnboardingOpen(true);
    }
  }, []);

  // 온보딩 완료 처리
  const handleOnboardingClose = () => {
    localStorage.setItem(DONE_KEY, '1');
    setIsOnboardingOpen(false);
  };

  // 임시 상태
  const isLoggedIn = true;
  const nickname = null;

  const headerContent = getDashboardHeaderContent({
    isLoggedIn,
    nickname,
  });

  const handleProfileClick = () => {
    navigate(isLoggedIn ? '/mypage' : '/login');
  };

  // 최근 학습 데이터 (임시)
  const recentLearning = {
    category: '부동산 · 주거',
    chapterTitle: '전세사기 예방 기초',
    progressPercent: 68,
  };

  const shouldShowContinueCard =
    recentLearning != null && recentLearning.progressPercent < 100;

  const continueCardContent = shouldShowContinueCard
    ? getDashboardContinueCardContent(recentLearning)
    : null;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-6 pt-4">
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
                onContinue={() => {}}
              />
            )}

            <DashboardCategoryList
              categories={DASHBOARD_CATEGORIES}
              onCategoryClick={(category) => {
                console.log(category.name);
              }}
            />

            <DashboardTodayRecommendation
              recommendations={DASHBOARD_RECOMMENDATIONS}
              onRecommendationClick={(recommendation) => {
                console.log(recommendation.title);
              }}
            />
          </div>
        </div>

        <button
          onClick={() => navigate('/learning/word/contract_step2')}
          className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          단어 학습 시작
        </button>
      </section>
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleOnboardingClose}
      />
    </div>
  );
}

export default HomePage;
