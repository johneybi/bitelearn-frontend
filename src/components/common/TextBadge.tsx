import { cn } from '@/lib/utils';

type TextBadgeProps = {
  children: string;
  className?: string;
};

export default function TextBadge({ children, className }: TextBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full bg-slate-100 px-2.5 py-1.5 text-xs font-semibold leading-4 text-slate-600',
        className
      )}
    >
      {children}
    </span>
  );
}
