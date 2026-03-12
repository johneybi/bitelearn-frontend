import { getMe, refreshAccessToken } from '@/api/auth/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { clearAccessToken, setAccessToken } from '@/api/auth/tokenStore';
import { useEffect } from 'react';

type AuthInitializeProps = {
  children: React.ReactNode;
};

export default function AuthInitializer({ children }: AuthInitializeProps) {
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setIsInitializing = useAuthStore((state) => state.setIsInitializing);

  useEffect(() => {
    const initializeAuth = async () => {
      // OAuth 콜백 페이지로 진입할 경우 초기화 로직 스킵
      if (window.location.pathname.includes('/oauth/callback')) {
        setIsInitializing(false);
        return;
      }

      try {
        const refreshData = await refreshAccessToken();
        setAccessToken(refreshData.accessToken);

        const me = await getMe();
        setUser(me);
      } catch (error) {
        console.error('인증 초기화 중 오류 발생', error);

        clearAccessToken();
        clearAuth();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [setUser, clearAuth, setIsInitializing]);

  if (isInitializing) {
    return <div>로딩 중...</div>;
  }

  return <>{children}</>;
}
