import OnboardingModal from '@/components/features/onboarding/OnboardingModal';
import { useState, useEffect } from 'react';

function Home() {
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

  return (
    <div className="mx-auto h-full w-full p-6">
      <h1 className="text-3xl font-bold">BiteLearn</h1>
      <p className="text-sm text-slate-600">홈 페이지</p>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleOnboardingClose}
      />
    </div>
  );
}

export default Home;
