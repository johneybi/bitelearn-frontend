import { Outlet } from 'react-router-dom';
import BottomNav from '@/components/common/BottomNav';
import AppLogoHeader from '@/components/features/dashboard/AppLogoHeader';

export default function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <AppLogoHeader />
      <main className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
