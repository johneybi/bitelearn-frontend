import { useNavigate } from 'react-router-dom';

import { getMe, login } from '@/api/auth/auth.api';
import { setAccessToken } from '@/api/auth/tokenStore';
import { toExpiresAt } from '@/api/auth/token.util';
import LoginForm from '@/components/features/auth/LoginForm';
import type { LoginFormValues } from '@/schemas/loginSchema';
import { useAuthStore } from '@/stores/auth.store';

type SocialProvider = 'GOOGLE' | 'NAVER';

const SOCIAL_LOGIN_URL: Record<SocialProvider, string> = {
  GOOGLE: `${import.meta.env.VITE_API_BASE_URL}/login/oauth2/code/google`,
  NAVER: `${import.meta.env.VITE_API_BASE_URL}/login/oauth2/code/naver`,
};

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // 로컬 로그인 핸들러
  const handleLocalLogin = async (data: LoginFormValues) => {
    try {
      const response = await login(data);
      const expiresAt = toExpiresAt(response.accessTokenExpiresIn);

      setAccessToken(response.accessToken, expiresAt);

      const me = await getMe();
      setUser(me);

      navigate('/');
    } catch (error) {
      console.error('로그인 실패', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
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
