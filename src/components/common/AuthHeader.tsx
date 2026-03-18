import { ArrowLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type AuthHeaderControl = 'back' | 'close';

type AuthHeaderProps = {
  title?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  className?: string;
};

const CONTROL_LABEL: Record<AuthHeaderControl, string> = {
  back: '이전',
  close: '닫기',
};

function HeaderControlButton({
  control,
  onClick,
}: {
  control: AuthHeaderControl;
  onClick?: () => void;
}) {
  const iconClassName = 'h-6 w-6';

  return (
    <button
      type="button"
      aria-label={CONTROL_LABEL[control]}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-xl text-foreground"
    >
      {control === 'back' ? <ArrowLeft className={iconClassName} /> : null}
      {control === 'close' ? <X className={iconClassName} /> : null}
    </button>
  );
}

export default function AuthHeader({
  title,
  showBackButton = false,
  showCloseButton = false,
  onBackClick,
  onCloseClick,
  className,
}: AuthHeaderProps) {
  return (
    <header className={cn('flex h-14 items-center bg-background', className)}>
      <div className="inline-flex h-11 w-11 items-center justify-center">
        {showBackButton && (
          <HeaderControlButton control="back" onClick={onBackClick} />
        )}
      </div>

      <div className="flex flex-1 justify-center">
        {title && (
          <h1 className="text-base font-bold text-foreground">{title}</h1>
        )}
      </div>

      <div className="flex w-11 items-center justify-center">
        {showCloseButton && (
          <HeaderControlButton control="close" onClick={onCloseClick} />
        )}
      </div>
    </header>
  );
}
