import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

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
import { formatDisplayName } from '@/utils/formatUser';

function HomePage() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const headerContent = getDashboardHeaderContent({
    isLoggedIn: !!user,
    nickname: user?.nickname ? formatDisplayName(user.nickname) : null,
  });

  const handleProfileClick = () => {
    navigate(user ? '/mypage' : '/login');
  };

  // 최근 학습 데이터 (임시)
  const recentLearning = {
    categoryId: 'real-estate',
    chapterId: '1001',
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
              onCategoryClick={() => navigate('/learning')}
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
    </div>
  );
}

export default HomePage;
