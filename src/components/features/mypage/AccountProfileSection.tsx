import { formatDisplayName } from '@/utils/formatUser';
import { Camera, Pencil } from 'lucide-react';

type AccountProfileSectionProps = {
  nickname: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AccountProfileSection({
  nickname,
  isEditing,
  onEdit,
  onChange,
  onSubmit,
}: AccountProfileSectionProps) {
  return (
    <section className="bg-slate-50 px-5 py-5">
      <article className="px-4 py-4">
        <div className="mt-4 flex flex-col items-center gap-3 pb-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl">
              👤
            </div>

            <button
              type="button"
              aria-label="프로필 이미지 변경하기"
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 닉네임 영역 */}
          {!isEditing ? (
            <div className="flex items-center gap-1">
              <p className="text-base text-slate-700">
                {formatDisplayName(nickname)}
              </p>

              <button
                type="button"
                aria-label="닉네임 변경하기"
                onClick={onEdit}
                className="flex items-center justify-center text-slate-600"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                value={nickname}
                onChange={(e) => onChange(e.target.value)}
                className="h-9 rounded-md border border-slate-200 px-2 text-sm outline-none focus:border-slate-400"
              />

              <button
                type="button"
                onClick={onSubmit}
                className="rounded-md bg-slate-900 px-3 py-1 text-xs text-white"
              >
                저장
              </button>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
