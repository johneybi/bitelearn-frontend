import { useNavigate } from 'react-router-dom';

import type { SignupFormValues } from '@/schemas/signupSchema';
import SignupForm from '@/components/features/auth/SignupForm';
import { signup } from '@/api/auth/auth.api';

export default function SignupPage() {
  const navigate = useNavigate();

  // 회원가입 제출 핸들러
  const handleSignupSubmit = async (data: SignupFormValues) => {
    try {
      const { passwordConfirm, ...submitData } = data;
      await signup(submitData);

      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return <SignupForm onSubmit={handleSignupSubmit} />;
}
