import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';
import DashboardHeader from '@/components/features/dashboard/DashboardHeader';
import { getDashboardHeaderText } from '@/components/features/dashboard/getDashboardHeaderText';

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

  const headerText = getDashboardHeaderText({
    isLoggedIn,
    nickname,
  });

  const handleProfileClick = () => {
    navigate(isLoggedIn ? '/mypage' : '/login');
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-6 pt-4">
        <div className="flex flex-col">
          <DashboardHeader
            title={headerText.title}
            subtitle={headerText.subtitle}
            profileButtonLabel={headerText.profileButtonLabel}
            onProfileClick={handleProfileClick}
          />
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
