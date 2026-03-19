import { setAccessToken, clearAccessToken } from '@/api/auth/tokenStore';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authQueryKeys, fetchMe } from '@/api/auth/auth.query';
import { isAppError } from '@/api/error/appError';
import { toExpiresAt } from '@/api/auth/token.util';
import { logError } from '@/lib/logError';
import AppLoading from '@/components/common/AppLoading';

const OAUTH_CALLBACK_ERROR_FALLBACK_MESSAGE =
  '소셜 로그인 처리에 실패했습니다. 다시 시도해주세요.';

export default function OAuthCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
        const me = await fetchMe();
        queryClient.setQueryData(authQueryKeys.me, me);

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
        queryClient.setQueryData(authQueryKeys.me, null);
        navigate('/login', { replace: true });
      }
    };

    processOAuthLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, navigate, queryClient]);

  return <AppLoading message="로그인 처리 중..." />;
}
