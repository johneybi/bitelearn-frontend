import { useNavigate } from 'react-router-dom';

import type { LoginFormValues } from '@/schemas/loginSchema';
import LoginForm from '@/components/features/auth/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();

  // 로그인 제출 핸들러
  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      console.log('API 요청 데이터:', data);
      // 백엔드 API 명세가 확정된 후 axios 통신 로직 추가
      // await apiClient.post('/api/auth/login', data);

      alert('로그인이 완료되었습니다! 홈 페이지로 이동합니다.');
      navigate('/');
    } catch (error) {
      console.error('로그인 실패', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return <LoginForm onSubmit={handleLoginSubmit} />;
}
