import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const SUPPORTED_PROVIDERS = ['google', 'naver'];

export default function AuthCallbackPage() {
  const { provider } = useParams<{ provider: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    if (!provider || !SUPPORTED_PROVIDERS.includes(provider)) {
      console.warn(`지원하지 않는 Provider 접근: ${provider}`);
      navigate('/login', { replace: true });
      return;
    }

    const processOAuth = async () => {
      if (code) {
        try {
          console.log(`[${provider}] 서버로 코드 전송 준비:`, code);
          // 백엔드 API 명세가 확정된 후 서버로 code 전송 로직 추가

          navigate('/', { replace: true });
        } catch (error) {
          console.error('서버 인증 실패', error);
          navigate('/login', { replace: true });
        }
        return;
      }
    };

    processOAuth();
  }, [provider, code, error, navigate]);

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-3 p-6">
      <h1 className="text-2xl font-semibold">AuthCallback</h1>
      <p className="text-sm text-slate-600">
        {provider} 로그인 처리 중입니다...
      </p>
    </div>
  );
}
