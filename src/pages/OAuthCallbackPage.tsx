import { setAccessToken } from '@/api/auth/tokenStore';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OAuthCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');

    if (!accessToken) {
      navigate('/login', { replace: true });
      return;
    }

    setAccessToken(accessToken);

    // 주소창에서 accessToken 제거
    window.history.replaceState({}, '', location.pathname);

    navigate('/', { replace: true });
  }, [location.pathname, location.search, navigate]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <p className="text-sm text-slate-500">로그인 처리 중...</p>
    </div>
  );
}
