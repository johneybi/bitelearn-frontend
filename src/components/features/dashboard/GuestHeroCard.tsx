import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardHeroCard from './DashboardHeroCard';

export default function GuestHeroCard() {
  const navigate = useNavigate();

  return (
    <DashboardHeroCard>
      <Button
        type="button"
        variant="outline"
        className="relative h-[54px] w-full rounded-2xl border-none bg-card px-4 text-base font-semibold text-foreground shadow-[0_-4px_32px_12px_rgba(254,215,170,1)]"
        onClick={() => navigate('/login')}
      >
        <span>3초만에 로그인</span>
        <ChevronRight className="absolute right-4 h-6 w-6 text-slate-600" />
      </Button>
    </DashboardHeroCard>
  );
}
