import type { RefCallback } from 'react';
import { RotateCcw } from 'lucide-react';

import MistakeCard from '@/components/features/note/MistakeCard';

type NoteCategory = {
  categoryId: string;
  categoryName: string;
};

type NoteMistake = {
  id: string;
  categoryId: string;
  chapterTitle: string;
  question: string;
  wrongAt: string;
};

type ReviewMistakeListProps = {
  categories: NoteCategory[];
  mistakes: NoteMistake[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  sentinelRef?: RefCallback<HTMLDivElement>;
};

export default function ReviewMistakeList({
  categories,
  mistakes,
  isLoading = false,
  isLoadingMore = false,
  hasNext = false,
  sentinelRef,
}: ReviewMistakeListProps) {
  if (isLoading) {
    return (
      <div className="rounded-[32px] border-2 border-dashed border-slate-100 py-20 text-center">
        <p className="text-sm font-bold text-slate-400">
          오답노트를 불러오는 중이에요
        </p>
      </div>
    );
  }

  if (mistakes.length === 0) {
    return (
      <div className="rounded-[32px] border-2 border-dashed border-slate-100 py-20 text-center">
        <RotateCcw size={32} className="mx-auto mb-4 text-slate-200" />
        <p className="text-sm font-bold text-slate-400">
          모든 오답을 정복했어요!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {mistakes.map((item) => (
        <MistakeCard
          key={item.id}
          categoryLabel={
            categories.find((category) => category.categoryId === item.categoryId)
              ?.categoryName || '미분류'
          }
          dateText={new Date(item.wrongAt).toLocaleDateString('ko-KR')}
          chapterTitle={item.chapterTitle}
          question={item.question}
          timeText={new Date(item.wrongAt).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        />
      ))}

      <div className="pt-2 text-center">
        {isLoadingMore && (
          <p className="text-xs font-bold text-slate-300">
            오답노트를 더 불러오는 중이에요
          </p>
        )}

        {!hasNext && mistakes.length > 0 && (
          <p className="text-xs font-bold text-slate-300">
            오답노트를 모두 확인했어요
          </p>
        )}

        {hasNext && <div ref={sentinelRef} className="h-4 w-full" />}
      </div>
    </div>
  );
}
