import { useState } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';
import type { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

type RequiredConsentKey = 'service' | 'privacy' | 'age';

type ConsentState = Record<RequiredConsentKey, boolean>;

type TermsAgreementFormProps = {
  onNext: () => void;
  onOpenServiceTerms?: () => void;
  onOpenPrivacyTerms?: () => void;
};

const REQUIRED_CONSENTS = [
  {
    key: 'service' as const,
    label: '[필수] 바이트런 서비스 이용약관에 동의합니다.',
  },
  {
    key: 'privacy' as const,
    label: '[필수] 개인정보 처리방침에 동의합니다.',
  },
  {
    key: 'age' as const,
    label: '[필수] 본인은 만 14세 이상입니다.',
  },
];

const INITIAL_CONSENTS: ConsentState = {
  service: false,
  privacy: false,
  age: false,
};

const TERMS_CHECKBOX_CLASSNAME =
  'h-[22px] w-[22px] rounded-[6px] border border-border bg-input data-[state=checked]:border-transparent data-[state=checked]:bg-green-500 data-[state=checked]:text-white';

export default function TermsAgreementForm({
  onNext,
  onOpenServiceTerms,
  onOpenPrivacyTerms,
}: TermsAgreementFormProps) {
  const [consents, setConsents] = useState<ConsentState>(INITIAL_CONSENTS);

  const areAllRequiredChecked = Object.values(consents).every(Boolean);

  const handleAllConsentChange = (checked: CheckedState) => {
    const nextChecked = checked === true;
    setConsents({
      service: nextChecked,
      privacy: nextChecked,
      age: nextChecked,
    });
  };

  const handleConsentChange =
    (key: RequiredConsentKey) => (checked: CheckedState) => {
      setConsents((prev) => ({
        ...prev,
        [key]: checked === true,
      }));
    };

  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col px-5 pb-8 pt-6">
      <div className="space-y-2">
        <button
          type="button"
          onClick={onOpenServiceTerms}
          className="flex w-full items-center justify-between rounded-xl px-1 py-2.5 text-left"
        >
          <span className="text-base font-normal leading-6 text-foreground">
            서비스 이용약관
          </span>
          <ExternalLink className="h-5 w-5 text-foreground" />
        </button>

        <button
          type="button"
          onClick={onOpenPrivacyTerms}
          className="flex w-full items-center justify-between rounded-xl px-1 py-2.5 text-left"
        >
          <span className="text-base font-normal leading-6 text-foreground">
            개인정보 처리방침 동의
          </span>
          <ExternalLink className="h-5 w-5 text-foreground" />
        </button>
      </div>

      <div className="mt-auto space-y-4">
        <label className="flex cursor-pointer items-center gap-2">
          <Checkbox
            checked={areAllRequiredChecked}
            onCheckedChange={handleAllConsentChange}
            className={TERMS_CHECKBOX_CLASSNAME}
          />
          <span className="text-sm leading-5 text-foreground">
            약관 전체 동의하기
          </span>
        </label>

        <div className="space-y-4 pl-4">
          {REQUIRED_CONSENTS.map((consent) => (
            <label
              key={consent.key}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                checked={consents[consent.key]}
                onCheckedChange={handleConsentChange(consent.key)}
                className={TERMS_CHECKBOX_CLASSNAME}
              />
              <span className="text-sm leading-5 text-foreground">
                {consent.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button
          type="button"
          onClick={onNext}
          disabled={!areAllRequiredChecked}
          className="relative h-14 w-full rounded-2xl text-base font-medium text-foreground disabled:opacity-25"
        >
          다음
          <ChevronRight className="absolute right-4 h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
