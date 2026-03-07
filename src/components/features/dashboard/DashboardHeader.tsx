import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

type DashboardHeaderProps = {
  title: string;
  subtitle: string;
  onProfileClick: () => void;
  profileButtonLabel: string;
};

export default function DashboardHeader({
  title,
  subtitle,
  onProfileClick,
  profileButtonLabel,
}: DashboardHeaderProps) {
  return (
    <header className="py-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="text-sm font-medium leading-relaxed text-slate-500">
            {subtitle}
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-2xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          onClick={onProfileClick}
          aria-label={profileButtonLabel}
        >
          <User className="h-6 w-6 text-slate-400" />
        </Button>
      </div>
    </header>
  );
}
