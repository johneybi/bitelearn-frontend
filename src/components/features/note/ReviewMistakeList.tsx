import type { RefCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import type { Category } from '@/api/learning/learning.types';
import type { Note } from '@/api/notes/notes.types';

import MistakeCard from '@/components/features/note/MistakeCard';

type NoteCategory = {
  category: Category;
  categoryName: string;
};

type ReviewMistakeListProps = {
  categories: NoteCategory[];
  notes: Note[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  sentinelRef?: RefCallback<HTMLDivElement>;
};

export default function ReviewMistakeList({
  categories,
  notes,
  isLoading = false,
  isLoadingMore = false,
  hasNext = false,
  sentinelRef,
}: ReviewMistakeListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="rounded-[32px] border-2 border-dashed border-slate-100 py-20 text-center">
        <p className="text-sm font-bold text-slate-400">
          오답노트를 불러오는 중이에요
        </p>
      </div>
    );
  }

  if (notes.length === 0) {
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
      {notes.map((note) => (
        <MistakeCard
          key={note.noteId}
          categoryName={
            categories.find((category) => category.category === note.category)
              ?.categoryName || '미분류'
          }
          createdAt={note.createdAt}
          topic={note.topic}
          questionTitle={note.questionTitle}
          onSelect={() => navigate(`/notes/incorrect/${note.noteId}`)}
        />
      ))}

      <div className="pt-2 text-center">
        {isLoadingMore && (
          <p className="text-xs font-bold text-slate-300">
            오답노트를 더 불러오는 중이에요
          </p>
        )}

        {!hasNext && notes.length > 0 && (
          <p className="text-xs font-bold text-slate-300">
            오답노트를 모두 확인했어요
          </p>
        )}

        {hasNext && <div ref={sentinelRef} className="h-4 w-full" />}
      </div>
    </div>
  );
}
