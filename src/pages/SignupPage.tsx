import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { SignupFormValues } from '@/schemas/signupSchema';
import SignupForm, {
  type SignupFormSubmitHelpers,
} from '@/components/features/auth/SignupForm';
import { signup } from '@/api/auth/auth.api';
import { isAppError } from '@/api/error/appError';
import { API_ERROR_MESSAGE } from '@/api/error/errorMessages';
import { logError } from '@/lib/logError';

const SIGNUP_ERROR_FALLBACK_MESSAGE =
  '회원가입에 실패했습니다. 다시 시도해주세요.';

export default function SignupPage() {
  const navigate = useNavigate();

  // 회원가입 제출 핸들러
  const handleSignupSubmit = async (
    data: SignupFormValues,
    { clearErrors, setError }: SignupFormSubmitHelpers
  ) => {
    clearErrors();

    try {
      const { passwordConfirm, ...submitData } = data;
      await signup(submitData);

      toast.success('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      if (isAppError(error)) {
        if (error.message === API_ERROR_MESSAGE.EMAIL_DUPLICATION) {
          setError('email', {
            type: 'server',
            message: error.message,
          });
          return;
        }

        if (error.message === API_ERROR_MESSAGE.NICKNAME_DUPLICATION) {
          setError('nickname', {
            type: 'server',
            message: error.message,
          });
          return;
        }
      }

      logError('SignupPage', '회원가입 실패', error);
      toast.error(
        isAppError(error) ? error.message : SIGNUP_ERROR_FALLBACK_MESSAGE
      );
    }
  };

  return <SignupForm onSubmit={handleSignupSubmit} />;
}
