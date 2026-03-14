import { Outlet, useLocation } from 'react-router-dom';
import { getAccessToken } from '@/api/auth/tokenStore';
import { useAuthStore } from '@/stores/auth.store';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';
import { completeOnboarding } from '@/api/auth/auth.api';

export default function RootLayout() {
  const location = useLocation();
  const isOnboardingOpen = useAuthStore((state) => state.isOnboardingOpen);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsOnboardingOpen = useAuthStore(
    (state) => state.setIsOnboardingOpen
  );
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  const handleCompleteOnboarding = async () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    const accessToken = getAccessToken();

    if (!isAuthenticated || !user || !accessToken) {
      setIsOnboardingOpen(false);
      return;
    }

    try {
      await completeOnboarding();

      setUser({
        ...user,
        isOnboardingCompleted: true,
      });
    } catch (error) {
      console.error('온보딩 완료 처리 실패', error);
    }
  };

  return (
    <div className="h-dvh bg-neutral-100">
      <div className="mx-auto flex h-full w-full max-w-app flex-col bg-white">
        <Outlet />

        <OnboardingModal
          isOpen={isOnboardingOpen && !isAuthPage}
          onClose={handleCompleteOnboarding}
        />
      </div>
    </div>
  );
}
