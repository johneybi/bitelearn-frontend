import type { RefCallback } from 'react';
import type {
  Category,
} from '@/api/learning/learning.types';
import type { Note } from '@/api/notes/notes.types';
import ReviewSummary from '@/components/features/note/ReviewSummary';
import ReviewMistakeList from '@/components/features/note/ReviewMistakeList';
import ReviewCategoryChip from '@/components/features/note/ReviewCategoryChip';

type NoteCategory = {
  category: Category;
  categoryName: string;
};

type ReviewNoteSectionProps = {
  selectedCategory: Category | null;
  onChangeCategory: (category: Category | null) => void;
  categories: NoteCategory[];
  notes: Note[];
  totalBytes: number;
  totalNoteCount: number;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  sentinelRef?: RefCallback<HTMLDivElement>;
};

export default function ReviewNoteSection({
  selectedCategory,
  onChangeCategory,
  categories,
  notes,
  totalBytes,
  totalNoteCount,
  isLoading = false,
  isLoadingMore = false,
  hasNext = false,
  sentinelRef,
}: ReviewNoteSectionProps) {
  const reviewCategories = [
    { category: null, categoryName: '전체' },
    ...categories,
  ];

  return (
    <>
      <ReviewSummary
        pendingReviewCount={totalNoteCount}
        totalBytes={totalBytes}
      />
      <div className="px-6 py-3">
        <div className="hide-scrollbar -mx-2 flex gap-2 overflow-x-auto px-2">
          {reviewCategories.map((category) => {
            const isActive = selectedCategory === category.category;

            return (
              <ReviewCategoryChip
                key={category.category ?? 'ALL'}
                label={category.categoryName}
                isActive={isActive}
                onClick={() => onChangeCategory(category.category)}
              />
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        <ReviewMistakeList
          categories={categories}
          notes={notes}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasNext={hasNext}
          sentinelRef={sentinelRef}
        />
      </div>
    </>
  );
}
