import ReviewSummary from '@/components/features/note/ReviewSummary';
import ReviewMistakeList from '@/components/features/note/ReviewMistakeList';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
};

export default function ReviewNoteSection({
  selectedCategoryId,
  onChangeCategory,
  categories,
  mistakes,
  totalExp,
}: ReviewNoteSectionProps) {
  const reviewCategories = [
    { categoryId: 'all', categoryName: '전체' },
    ...categories,
  ];

  return (
    <>
      <ReviewSummary pendingReviewCount={mistakes.length} totalExp={totalExp} />
      <div className="px-6 py-3">
        <div className="hide-scrollbar -mx-2 flex gap-2 overflow-x-auto px-2">
          {reviewCategories.map((category) => {
            const isActive = selectedCategoryId === category.categoryId;

            return (
              <Button
                key={category.categoryId}
                type="button"
                variant={isActive ? 'default' : 'secondary'}
                onClick={() => onChangeCategory(category.categoryId)}
                className={cn(
                  'h-9 whitespace-nowrap rounded-full px-5 text-xs font-bold transition-all',
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'border-none bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                )}
              >
                {category.categoryName}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        <ReviewMistakeList categories={categories} mistakes={mistakes} />
      </div>
    </>
  );
}
