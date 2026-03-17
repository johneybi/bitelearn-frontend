import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

type AppLoadingProps = {
  message?: string;
  className?: string;
};

export default function AppLoading({
  message = '로딩 중...',
  className,
}: AppLoadingProps) {
  return (
    <div
      className={cn(
        'flex min-h-dvh flex-col items-center justify-center gap-3',
        className
      )}
    >
      <LoaderCircle className="h-6 w-6 animate-spin text-placeholder" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}
