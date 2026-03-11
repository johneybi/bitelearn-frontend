import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth.store';

export default function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitializing = useAuthStore((state) => state.isInitializing);

  if (isInitializing) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
