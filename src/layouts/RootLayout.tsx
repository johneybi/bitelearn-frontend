import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';

export default function RootLayout() {
  const isOnboardingOpen = useAuthStore((state) => state.isOnboardingOpen);
  const setIsOnboardingOpen = useAuthStore(
    (state) => state.setIsOnboardingOpen
  );

  const handleOnboardingClose = () => {
    // 온보딩 완료 처리 API 호출
    setIsOnboardingOpen(false);
  };

  return (
    <div className="h-dvh bg-neutral-100">
      <div className="mx-auto flex h-full w-full max-w-app flex-col bg-white">
        <Outlet />

        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={handleOnboardingClose}
        />
      </div>
    </div>
  );
}
