import { Outlet, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AuthLayout() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-dvh">
      <div className="relative mx-auto w-full max-w-md bg-white p-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="닫기"
          onClick={handleClose}
          className="absolute right-4 top-4"
        >
          <X className="h-5 w-5 text-slate-400" />
        </Button>
        <Outlet />
      </div>
    </div>
  );
}
