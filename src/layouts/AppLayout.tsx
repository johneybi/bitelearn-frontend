import { Outlet } from 'react-router-dom';
import BottomNav from '@/components/common/BottomNav';

export default function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
