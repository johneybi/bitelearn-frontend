import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { getMe, login } from '@/api/auth/auth.api';
import { isAppError } from '@/api/error/appError';
import { API_ERROR_MESSAGE } from '@/api/error/errorMessages';
import { setAccessToken } from '@/api/auth/tokenStore';
import { toExpiresAt } from '@/api/auth/token.util';
import LoginForm, {
  type LoginFormSubmitHelpers,
} from '@/components/features/auth/LoginForm';
import { logError } from '@/lib/logError';
import type { LoginFormValues } from '@/schemas/loginSchema';
import { useAuthStore } from '@/stores/auth.store';

type SocialProvider = 'GOOGLE' | 'NAVER';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');

const SOCIAL_LOGIN_URL: Record<SocialProvider, string> = {
  GOOGLE: `${API_BASE_URL}/oauth/login/google`,
  NAVER: `${API_BASE_URL}/oauth/login/naver`,
};

const LOGIN_ERROR_FALLBACK_MESSAGE =
  '로그인에 실패했습니다. 다시 시도해주세요.';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // 로컬 로그인 핸들러
  const handleLocalLogin = async (
    data: LoginFormValues,
    { clearErrors, setError }: LoginFormSubmitHelpers
  ) => {
    clearErrors();

    try {
      const response = await login(data);
      const expiresAt = toExpiresAt(response.accessTokenExpiresIn);

      setAccessToken(response.accessToken, expiresAt);

      const me = await getMe();
      setUser(me);

      navigate('/');
    } catch (error) {
      if (isAppError(error)) {
        if (error.message === API_ERROR_MESSAGE.LOGIN_FAILED) {
          setError('email', {
            type: 'server',
            message: ' ',
          });
          setError('password', {
            type: 'server',
            message: error.message,
          });
          return;
        }
      }

      logError('LoginPage', '로그인 실패', error);
      toast.error(
        isAppError(error) ? error.message : LOGIN_ERROR_FALLBACK_MESSAGE
      );
    }
  };

  // 소셜 로그인 핸들러
  const handleSocialLogin = (provider: SocialProvider) => {
    window.location.replace(SOCIAL_LOGIN_URL[provider]);
  };

  return (
    <LoginForm onSubmit={handleLocalLogin} onSocialLogin={handleSocialLogin} />
  );
}
