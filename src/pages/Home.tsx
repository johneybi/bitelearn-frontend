import OnboardingModal from '@/components/features/onboarding/OnboardingModal';
import { useState } from 'react';

function Home() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);

  return (
    <div className="mx-auto h-full w-full p-6">
      <h1 className="text-3xl font-bold">BiteLearn</h1>
      <p className="text-sm text-slate-600">홈 페이지</p>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
}

export default Home;
