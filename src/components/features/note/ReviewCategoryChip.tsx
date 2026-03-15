import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ReviewCategoryChipProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function ReviewCategoryChip({
  label,
  isActive = false,
  onClick,
}: ReviewCategoryChipProps) {
  return (
    <Button
      type="button"
      variant={isActive ? 'default' : 'secondary'}
      onClick={onClick}
      className={cn(
        'h-9 whitespace-nowrap rounded-full px-5 text-xs font-bold transition-all',
        isActive
          ? 'bg-slate-900 text-white shadow-md'
          : 'border-none bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
      )}
    >
      {label}
    </Button>
  );
}
