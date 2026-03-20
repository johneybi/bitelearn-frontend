import BiteCharacter from '@/components/features/character/BiteCharacter';

type ReviewSummaryProps = {
  pendingReviewCount: number;
  totalBytes: number;
  animateCharacter?: boolean;
};

export default function ReviewSummary({
  pendingReviewCount,
  totalBytes,
  animateCharacter = true,
}: ReviewSummaryProps) {
  const reviewMessage =
    pendingReviewCount === 0
      ? '복습 대기가 없어요! 지금 흐름 아주 좋아요! 🐾'
      : pendingReviewCount < 5
        ? '복습할 게 조금 남았어요. 금방 끝낼 수 있어요! 🐾'
        : pendingReviewCount < 10
          ? '멍멍이가 열심히 공부하고 있어요! 🐾'
          : '복습 대기가 많이 쌓였어요. 하나씩 같이 정리해봐요! 🦴';

  return (
    <div className="mt-6 bg-white px-6 pb-4 pt-6">
      <BiteCharacter
        exp={totalBytes}
        messageOverride={reviewMessage}
        animate={animateCharacter}
      />

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-3">
          <p className="mb-1 text-[10px] font-bold text-slate-400">복습 대기</p>

          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold text-slate-900">
              {pendingReviewCount}
            </span>

            <span className="ml-0.5 text-[10px] font-bold text-slate-300">
              개
            </span>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 p-3 shadow-md">
          <p className="mb-1 text-[10px] font-bold text-slate-400">
            보유 바이트
          </p>

          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold text-white">
              {totalBytes.toLocaleString()}
            </span>

            <span className="ml-0.5 text-[10px] font-bold italic text-white/60">
              B
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
