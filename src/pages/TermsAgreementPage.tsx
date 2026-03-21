import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Header from '@/components/common/Header';
import TermsAgreementForm from '@/components/features/auth/TermsAgreementForm';
import { SIGNUP_TERMS_AGREED_STORAGE_KEY } from '@/constants/auth';

export default function TermsAgreementPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-background pt-[60px]">
      <Header
        showBackButton
        title="약관동의"
        onBackClick={() => navigate(-1)}
      />

      <TermsAgreementForm
        onNext={() => {
          sessionStorage.setItem(SIGNUP_TERMS_AGREED_STORAGE_KEY, 'true');
          navigate('/signup');
        }}
        onOpenServiceTerms={() =>
          toast.info('서비스 이용약관 상세 페이지는 준비 중입니다.')
        }
        onOpenPrivacyTerms={() =>
          toast.info('개인정보 처리방침 상세 페이지는 준비 중입니다.')
        }
      />
    </div>
  );
}
