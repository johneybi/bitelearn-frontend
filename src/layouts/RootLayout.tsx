import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';
import { completeOnboarding } from '@/api/auth/auth.api';

export default function RootLayout() {
  const isOnboardingOpen = useAuthStore((state) => state.isOnboardingOpen);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleCompleteOnboarding = async () => {
    try {
      await completeOnboarding();

      if (!user) return;

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
          isOpen={isOnboardingOpen}
          onClose={handleCompleteOnboarding}
        />
      </div>
    </div>
  );
}
