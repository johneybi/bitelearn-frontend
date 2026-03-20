import type { RefCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BookmarkedArticleCardItem } from '@/mock/bookmarkedArticle';

type BookmarkSectionProps = {
  articles: BookmarkedArticleCardItem[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  sentinelRef?: RefCallback<HTMLDivElement>;
};

export default function BookmarkSection({
  articles,
  isLoading = false,
  isLoadingMore = false,
  hasNext = false,
  sentinelRef,
}: BookmarkSectionProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="mb-4 px-1 text-sm font-bold text-slate-400">
          저장한 아티클
        </h3>

        <div className="rounded-[32px] border-2 border-dashed border-slate-100 py-20 text-center">
          <p className="text-sm font-bold text-slate-400">
            저장한 글을 불러오는 중이에요
          </p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="mb-4 px-1 text-sm font-bold text-slate-400">
          저장한 아티클
        </h3>

        <div className="rounded-[32px] border-2 border-dashed border-slate-100 py-20 text-center">
          <Bookmark size={32} className="mx-auto mb-4 text-slate-200" />

          <p className="text-sm font-bold text-slate-400">
            아직 저장한 글이 없어요
          </p>

          <p className="mt-1 text-xs font-medium text-slate-300">
            마음에 드는 글을 저장해 보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="mb-4 px-1 text-sm font-bold text-slate-400">
        저장한 아티클
      </h3>

      <div className="flex flex-col gap-6">
        {articles.map((article) => (
          <Button
            key={article.articleId}
            variant="outline"
            onClick={() => navigate(`/articles/${article.articleId}`)}
            className="flex h-auto w-full flex-col items-start gap-4 rounded-[28px] border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300"
          >
            <div className="flex w-full items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50">
                <Bookmark size={18} className="text-slate-900" />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-[10px] font-bold text-slate-400">
                  {article.category}
                </p>

                <h4 className="truncate text-sm font-bold leading-tight text-slate-900">
                  {article.title}
                </h4>
              </div>
            </div>

            <div className="h-32 w-full overflow-hidden rounded-2xl bg-slate-100 opacity-80 grayscale">
              <img
                src={article.thumbnailUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          </Button>
        ))}
      </div>

      <div className="pt-2 text-center">
        {isLoadingMore && (
          <p className="text-xs font-bold text-slate-300">
            저장한 글을 더 불러오는 중이에요
          </p>
        )}

        {!hasNext && articles.length > 0 && (
          <p className="text-xs font-bold text-slate-300">
            저장한 글을 모두 확인했어요
          </p>
        )}

        {hasNext && <div ref={sentinelRef} className="h-4 w-full" />}
      </div>
    </div>
  );
}
