import type { RefCallback } from 'react';
import ReviewSummary from '@/components/features/note/ReviewSummary';
import ReviewMistakeList from '@/components/features/note/ReviewMistakeList';
import ReviewCategoryChip from '@/components/features/note/ReviewCategoryChip';

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

type ReviewNoteSectionProps = {
  selectedCategoryId: string;
  onChangeCategory: (categoryId: string) => void;
  categories: NoteCategory[];
  mistakes: NoteMistake[];
  totalExp: number;
  totalMistakeCount: number;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  sentinelRef?: RefCallback<HTMLDivElement>;
};

export default function ReviewNoteSection({
  selectedCategoryId,
  onChangeCategory,
  categories,
  mistakes,
  totalExp,
  totalMistakeCount,
  isLoading = false,
  isLoadingMore = false,
  hasNext = false,
  sentinelRef,
}: ReviewNoteSectionProps) {
  const reviewCategories = [
    { categoryId: 'all', categoryName: '전체' },
    ...categories,
  ];

  return (
    <>
      <ReviewSummary
        pendingReviewCount={totalMistakeCount}
        totalExp={totalExp}
      />
      <div className="px-6 py-3">
        <div className="hide-scrollbar -mx-2 flex gap-2 overflow-x-auto px-2">
          {reviewCategories.map((category) => {
            const isActive = selectedCategoryId === category.categoryId;

            return (
              <ReviewCategoryChip
                key={category.categoryId}
                label={category.categoryName}
                isActive={isActive}
                onClick={() => onChangeCategory(category.categoryId)}
              />
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        <ReviewMistakeList
          categories={categories}
          mistakes={mistakes}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasNext={hasNext}
          sentinelRef={sentinelRef}
        />
      </div>
    </>
  );
}
