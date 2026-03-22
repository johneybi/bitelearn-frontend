import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { login } from '@/api/auth/auth.api';
import { authQueryKeys, fetchMe } from '@/api/auth/auth.query';
import { isAppError } from '@/api/error/appError';
import { setAccessToken } from '@/api/auth/tokenStore';
import { toExpiresAt } from '@/api/auth/token.util';
import LoginForm, {
  type LoginFormSubmitHelpers,
} from '@/components/features/auth/LoginForm';
import { logError } from '@/lib/logError';
import type { LoginFormValues } from '@/schemas/loginSchema';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/common/Header';

import logo from '@/assets/brand/logo.svg';
import symbol from '@/assets/brand/symbol.svg';
import google from '@/assets/icons/social/google.svg';
import naver from '@/assets/icons/social/naver.svg';

type SocialProvider = 'GOOGLE' | 'NAVER';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');

const SOCIAL_LOGIN_URL: Record<SocialProvider, string> = {
  GOOGLE: `${API_BASE_URL}/oauth/login/google`,
  NAVER: `${API_BASE_URL}/oauth/login/naver`,
};

const LOGIN_ERROR_FALLBACK_MESSAGE =
  '로그인에 실패했습니다. 다시 시도해주세요.';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const redirectTo =
    typeof location.state?.from?.pathname === 'string'
      ? location.state.from.pathname
      : '/';

  // 로컬 로그인 핸들러
  const handleLocalLogin = async (
    data: LoginFormValues,
    { clearErrors }: LoginFormSubmitHelpers
  ) => {
    clearErrors();

    try {
      const response = await login(data);
      const expiresAt = toExpiresAt(response.accessTokenExpiresIn);

      setAccessToken(response.accessToken, expiresAt);
      const me = await fetchMe();
      queryClient.setQueryData(authQueryKeys.me, me);

      navigate(redirectTo, { replace: true });
    } catch (error) {
      logError('LoginPage', '로그인 실패', error);

      if (isAppError(error)) {
        toast.error(error.message);
        return;
      }

      toast.error(LOGIN_ERROR_FALLBACK_MESSAGE);
    }
  };

  // 소셜 로그인 핸들러
  const handleSocialLogin = (provider: SocialProvider) => {
    window.location.replace(SOCIAL_LOGIN_URL[provider]);
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <Header
        showCloseButton
        onCloseClick={() => navigate(-1)}
      />

      <div className="flex flex-1 flex-col gap-6 bg-background px-5 pt-[60px]">
        <div className="flex flex-col items-center justify-center gap-10 self-stretch px-[69px] pb-16 pt-24">
          <div className="flex items-center justify-center gap-3">
            <img
              src={symbol}
              alt="logo"
              className="h-10 w-[29px]"
              aria-hidden="true"
            />
            <img src={logo} alt="bitelearn" className="h-[34px] w-[154px]" />
          </div>
        </div>

        <div className="flex flex-col gap-16">
          <LoginForm onSubmit={handleLocalLogin} />

          <div className="flex w-full flex-col gap-5">
            <button
              type="button"
              onClick={() => handleSocialLogin('GOOGLE')}
              className="relative inline-flex h-11 w-full items-center justify-center rounded-xl border border-border bg-popover px-4 py-2.5 text-base font-medium text-foreground shadow-sm transition-colors"
            >
              <img
                src={google}
                alt=""
                aria-hidden="true"
                className="mr-2 h-5 w-5"
              />
              <span>구글로 시작하기</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('NAVER')}
              className="relative inline-flex h-11 w-full items-center justify-center rounded-xl border border-border bg-popover px-4 py-2.5 text-base font-medium text-foreground shadow-sm transition-colors"
            >
              <img
                src={naver}
                alt=""
                aria-hidden="true"
                className="mr-2 h-4 w-4"
              />
              <span>네이버로 시작하기</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/signup/terms')}
              className="relative inline-flex h-11 w-full items-center justify-center rounded-xl bg-secondary px-4 py-2.5 text-base font-medium text-white transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
                <span>이메일로 가입하기</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
