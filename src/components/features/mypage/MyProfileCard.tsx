import { ChevronRight } from 'lucide-react';

type MyProfileCardProps = {
  nickname: string;
  email: string;
  onClick: () => void;
};

export default function MyProfileCard({
  nickname,
  email,
  onClick,
}: MyProfileCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl">
            👤
          </div>
          <div>
            <p className="text-lg font-bold">{nickname}님</p>
            <p className="text-sm text-slate-600">{email}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ChevronRight className="h-5 w-5 text-slate-500" />
        </div>
      </div>
    </button>
  );
}
