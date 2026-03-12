import { useNavigate } from 'react-router-dom';
import { login, getMe } from '@/api/auth/auth.api';
import { setAccessToken } from '@/api/auth/tokenStore';
import { useAuthStore } from '@/stores/auth.store';

import type { LoginFormValues } from '@/schemas/loginSchema';
import LoginForm from '@/components/features/auth/LoginForm';

type SocialProvider = 'GOOGLE' | 'NAVER';

const SOCIAL_LOGIN_URL: Record<SocialProvider, string> = {
  GOOGLE: `${import.meta.env.VITE_API_BASE_URL}/oauth/login/google`,
  NAVER: `${import.meta.env.VITE_API_BASE_URL}/oauth/login/naver`,
};

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // 로컬 로그인 핸들러
  const handleLocalLogin = async (data: LoginFormValues) => {
    try {
      const response = await login(data);
      setAccessToken(response.accessToken);

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
