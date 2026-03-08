import { LayoutDashboard } from 'lucide-react';
import BiteCharacter from '@/components/features/character/BiteCharacter';

type NoteHeaderProps = {
  totalCompleted: number;
  totalChapters: number;
  consecutiveDays: number;
  totalExp: number;
};

export default function NoteHeader({
  totalCompleted,
  totalChapters,
  consecutiveDays,
  totalExp,
}: NoteHeaderProps) {
  return (
    <header className="shrink-0 border-b border-slate-50 bg-white px-6 pb-6 pt-12">
      {/* Title */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            나의 학습 노트
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            나의 성장을 한눈에 확인하세요.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50">
          <LayoutDashboard size={24} className="text-slate-400" />
        </div>
      </div>

      {/* Character */}
      <BiteCharacter exp={totalExp} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-3">
          <p className="mb-1 text-[10px] font-bold text-slate-400">
            전체 진행률
          </p>

          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold text-slate-900">
              {totalCompleted}
            </span>

            <span className="text-[10px] font-bold text-slate-300">
              /{totalChapters}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-3">
          <p className="mb-1 text-[10px] font-bold text-slate-400">연속 학습</p>

          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold text-slate-900">
              {consecutiveDays}
            </span>

            <span className="text-[10px] font-bold text-slate-300">일째</span>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 p-3 shadow-md">
          <p className="mb-1 text-[10px] font-bold text-slate-400">
            보유 바이트
          </p>

          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold text-white">
              {totalExp.toLocaleString()}
            </span>

            <span className="ml-0.5 text-[10px] font-bold italic text-white/60">
              B
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
