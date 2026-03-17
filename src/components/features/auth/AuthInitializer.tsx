import { getMe } from '@/api/auth/auth.api';
import { isAppError } from '@/api/error/appError';
import { API_ERROR_MESSAGE } from '@/api/error/errorMessages';
import { ensureValidAccessToken } from '@/api/auth/authRefresh';
import { useAuthStore } from '@/stores/auth.store';
import { clearAccessToken } from '@/api/auth/tokenStore';
import { logError } from '@/lib/logError';
import { useEffect } from 'react';

type AuthInitializeProps = {
  children: React.ReactNode;
};

const SILENT_AUTH_ERROR_MESSAGES = new Set<string>([
  API_ERROR_MESSAGE.INVALID_REFRESH_TOKEN,
  API_ERROR_MESSAGE.EXPIRED_REFRESH_TOKEN,
  API_ERROR_MESSAGE.USER_NOT_FOUND,
]);

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
        const accessToken = await ensureValidAccessToken();

        // 유효한 토큰 확보 실패 → 비로그인 상태
        if (!accessToken) {
          clearAccessToken();
          clearAuth();
          return;
        }

        const me = await getMe();

        setUser(me);
      } catch (error) {
        const isSilentAuthError =
          isAppError(error) &&
          (error.status === 401 ||
            SILENT_AUTH_ERROR_MESSAGES.has(error.message));

        if (!isSilentAuthError) {
          logError('AuthInitializer', '인증 초기화 중 오류 발생', error);
        }
        clearAccessToken();
        clearAuth();
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
