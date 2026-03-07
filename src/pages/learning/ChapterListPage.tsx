import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import StageNode from '@/components/features/learning/StageNode';
import { Button } from '@/components/ui/button';
import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';
import { cn } from '@/lib/utils';

export default function ChapterListPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const category =
    MOCK_CATEGORY_CHAPTERS.find((c) => c.categoryId === categoryId) ??
    MOCK_CATEGORY_CHAPTERS[0];

  const progressPercent = Math.round(
    (category.completedChapters / category.totalChapters) * 100
  );

  const handleBack = () => {
    navigate('/learning');
  };

  const handleSelectChapter = (chapterId: string) => {
    navigate(`/learning/${category.categoryId}/${chapterId}`);
  };

  return (
    <div className="flex h-full flex-col bg-white text-slate-900">
      <div className="shrink-0 border-b border-slate-100 bg-white">
        <div className="flex h-14 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9 rounded-xl text-slate-600"
          >
            <ChevronLeft size={20} />
          </Button>

          <h1 className="flex-1 text-center text-sm font-bold text-slate-900">
            학습 로드맵
          </h1>

          <div className="h-9 w-9" />
        </div>

        <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
          {MOCK_CATEGORY_CHAPTERS.map((cat) => {
            const isSelected = category.categoryId === cat.categoryId;

            return (
              <Button
                key={cat.categoryId}
                variant={isSelected ? 'default' : 'secondary'}
                onClick={() => navigate(`/learning/${cat.categoryId}`)}
                className={cn(
                  'h-9 whitespace-nowrap rounded-full px-4 text-xs font-bold transition-all',
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'border-none bg-slate-100 text-slate-500 hover:bg-slate-200'
                )}
              >
                {cat.emoji} {cat.categoryName}
              </Button>
            );
          })}
        </div>
      </div>

      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-10 pt-10">
        <div className="mb-14 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {category.categoryName}
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-400">
                {category.tagline}
              </p>
            </div>

            <span className="text-2xl font-bold leading-none text-slate-900">
              {progressPercent}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-16">
          <div className="absolute bottom-8 top-8 w-1 rounded-full bg-slate-50" />

          {category.chapters.map((chapter, index) => (
            <StageNode
              key={chapter.id}
              chapter={chapter}
              index={index}
              onSelect={() => handleSelectChapter(chapter.id)}
            />
          ))}
        </div>

        <div className="mt-12 pb-32 text-center">
          <div className="inline-block rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-3 text-xs font-bold text-slate-300">
            다음 단계를 준비 중이에요
          </div>
        </div>
      </section>
    </div>
  );
}
