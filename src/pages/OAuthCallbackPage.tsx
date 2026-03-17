import { setAccessToken, clearAccessToken } from '@/api/auth/tokenStore';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getMe } from '@/api/auth/auth.api';
import { isAppError } from '@/api/error/appError';
import { useAuthStore } from '@/stores/auth.store';
import { toExpiresAt } from '@/api/auth/token.util';
import { logError } from '@/lib/logError';

const OAUTH_CALLBACK_ERROR_FALLBACK_MESSAGE =
  '소셜 로그인 처리에 실패했습니다. 다시 시도해주세요.';

export default function OAuthCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const processOAuthLogin = async () => {
      const params = new URLSearchParams(location.search);
      const accessToken = params.get('accessToken');
      const accessTokenExpiresIn = params.get('accessTokenExpiresIn');

      if (!accessToken || !accessTokenExpiresIn) {
        navigate('/login', { replace: true });
        return;
      }

      // 액세스 토큰 저장 및 주소창 정리
      const expiresAt = toExpiresAt(Number(accessTokenExpiresIn));
      setAccessToken(accessToken, expiresAt);
      window.history.replaceState({}, '', location.pathname);

      try {
        const me = await getMe();
        setUser(me);

        navigate('/', { replace: true });
      } catch (error) {
        logError(
          'OAuthCallbackPage',
          '소셜 로그인 유저 정보 가져오기 실패',
          error
        );

        toast.error(
          isAppError(error)
            ? error.message
            : OAUTH_CALLBACK_ERROR_FALLBACK_MESSAGE
        );

        clearAccessToken();
        clearAuth();
        navigate('/login', { replace: true });
      }
    };

    processOAuthLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <p className="text-sm text-slate-500">로그인 처리 중...</p>
    </div>
  );
}
