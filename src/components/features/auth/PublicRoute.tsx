import { Navigate, Outlet } from 'react-router-dom';
import AppLoading from '@/components/common/AppLoading';
import { useMeQuery } from '@/api/auth/auth.query';

export default function PublicRoute() {
  const { data: user, isPending } = useMeQuery();

  if (isPending) {
    return <AppLoading message="인증 정보를 확인하는 중..." />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
