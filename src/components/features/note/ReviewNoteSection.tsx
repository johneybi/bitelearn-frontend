import { RotateCcw } from 'lucide-react';

import MistakeCard from '@/components/features/note/MistakeCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
};

export default function ReviewNoteSection({
  selectedCategoryId,
  onChangeCategory,
  categories,
  mistakes,
}: ReviewNoteSectionProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text-slate-400">복습이 필요한 항목</h3>

        <Select value={selectedCategoryId} onValueChange={onChangeCategory}>
          <SelectTrigger className="h-9 w-[132px] border-slate-200 text-sm font-bold text-slate-900">
            <SelectValue placeholder="전체보기" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체보기</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6">
        {mistakes.length > 0 ? (
          mistakes.map((item) => (
            <MistakeCard
              key={item.id}
              categoryLabel={
                categories.find(
                  (category) => category.categoryId === item.categoryId
                )?.categoryName || '미분류'
              }
              dateText={new Date(item.wrongAt).toLocaleDateString('ko-KR')}
              chapterTitle={item.chapterTitle}
              question={item.question}
              timeText={new Date(item.wrongAt).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          ))
        ) : (
          <div className="rounded-[32px] border-2 border-dashed border-slate-100 py-20 text-center">
            <RotateCcw size={32} className="mx-auto mb-4 text-slate-200" />
            <p className="text-sm font-bold text-slate-400">
              모든 오답을 정복했어요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
