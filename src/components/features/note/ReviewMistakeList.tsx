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
};

export default function ReviewMistakeList({
  categories,
  mistakes,
}: ReviewMistakeListProps) {
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
    </div>
  );
}
