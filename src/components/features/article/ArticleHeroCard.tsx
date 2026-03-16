import { ArrowRight, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ArticleThumb from '@/components/features/article/ArticleThumb';
import type { ArticleDetail } from '@/mock/article';
import type { ArticleListItem } from '@/types/article';

type ArticleHeroCardProps = {
  article: ArticleListItem | ArticleDetail;
  onSelect: () => void;
};

function getAuthorName(article: ArticleListItem | ArticleDetail) {
  return 'authorName' in article ? article.authorName : article.author.name;
}

export default function ArticleHeroCard({
  article,
  onSelect,
}: ArticleHeroCardProps) {
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-[32px] border-2 border-slate-100 bg-white shadow-xl shadow-slate-200/30 transition-all duration-200 hover:border-slate-900 active:scale-[0.98]"
      onClick={onSelect}
    >
      {/* 썸네일 */}
      <div className="h-56 w-full overflow-hidden">
        <ArticleThumb category={article.category} />
      </div>

      {/* 콘텐츠 */}
      <div className="p-8">
        {/* 상단 meta */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white">
            추천 콘텐츠
          </span>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock size={12} />
            <span className="text-xs font-bold text-slate-500">3분 분량</span>
          </div>
        </div>

        {/* 제목 */}
        <h2 className="line-clamp-2 text-xl font-bold leading-tight text-slate-900">
          {article.title}
        </h2>

        {/* 하단 */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-6">
          <p className="text-sm font-medium text-slate-500">
            {getAuthorName(article)} 에디터
          </p>

          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full bg-slate-50 transition-all group-hover:bg-slate-900 group-hover:text-white"
          >
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </article>
  );
}
