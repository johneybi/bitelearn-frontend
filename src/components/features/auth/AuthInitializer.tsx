import { getMe } from '@/api/auth/auth.api';
import { ensureValidAccessToken } from '@/api/auth/authRefresh';
import { useAuthStore } from '@/stores/auth.store';
import { clearAccessToken } from '@/api/auth/tokenStore';
import { useEffect } from 'react';
import axios from 'axios';

type AuthInitializeProps = {
  children: React.ReactNode;
};

export default function AuthInitializer({ children }: AuthInitializeProps) {
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setIsInitializing = useAuthStore((state) => state.setIsInitializing);
  const setIsOnboardingOpen = useAuthStore(
    (state) => state.setIsOnboardingOpen
  );

  useEffect(() => {
    const initializeAuth = async () => {
      // OAuth 콜백 페이지로 진입할 경우 초기화 로직 스킵
      if (window.location.pathname.includes('/oauth/callback')) {
        setIsInitializing(false);
        return;
      }

      try {
        const accessToken = await ensureValidAccessToken();

        // 유효한 토큰 확보 실패 → 비로그인 상태
        if (!accessToken) {
          clearAccessToken();
          clearAuth();
          setIsOnboardingOpen(true);
          return;
        }

        const me = await getMe();

        setUser(me);
      } catch (error) {
        // 비로그인 상태에서 refresh 401은 정상 흐름으로 처리
        const isUnauthorized =
          axios.isAxiosError(error) && error.response?.status === 401;

        if (!isUnauthorized) {
          console.error('인증 초기화 중 오류 발생', error);
        }
        clearAccessToken();
        clearAuth();
        setIsOnboardingOpen(true);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInitializing) {
    return <div>로딩 중...</div>;
  }

  return <>{children}</>;
}
