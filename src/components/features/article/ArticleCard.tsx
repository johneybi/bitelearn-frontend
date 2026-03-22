import { Link } from 'react-router-dom';
import { ChevronRight, FileText } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import type { ArticleDetail, ArticleListItem } from '@/mock/article';

type ArticleCardProps = {
  article: ArticleListItem | ArticleDetail;
  variant?: 'relaxed' | 'compact';
};

function getAuthorName(article: ArticleListItem | ArticleDetail) {
  return 'authorName' in article ? article.authorName : article.author.name;
}

export default function ArticleCard({
  article,
  variant = 'relaxed',
}: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        to={`/articles/${article.articleId}`}
        className="group flex h-auto w-full flex-col items-start overflow-hidden rounded-3xl border-none bg-white p-0 text-left shadow-[0_12px_16px_rgba(237,238,246,1)] transition-all active:scale-[0.98]"
      >
        <div className="flex w-full items-center justify-between px-4 py-4">
          <span className="text-sm font-medium leading-5 text-slate-600">
            {getAuthorName(article)}
          </span>
          <span className="text-sm font-medium leading-5 text-slate-400">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <div className="flex w-full items-center gap-4 px-4 pb-4">
          <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-300">
            {article.thumbnailUrl ? (
              <img
                src={article.thumbnailUrl}
                className="h-full w-full object-cover"
                alt=""
              />
            ) : (
              <FileText size={24} className="text-white/80" />
            )}
          </div>

          <h3 className="line-clamp-3 flex-1 whitespace-normal break-keep text-base font-semibold leading-6 text-slate-950">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/articles/${article.articleId}`}
      className="group flex h-auto min-h-[120px] w-full items-start gap-4 overflow-hidden rounded-[28px] border-2 border-slate-100 bg-white p-5 text-left shadow-sm transition-all hover:border-slate-300 active:scale-[0.98]"
    >
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <p className="mb-1.5 truncate text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {article.category}
        </p>

        <h3 className="mb-auto line-clamp-3 whitespace-normal break-keep text-base font-bold italic leading-snug text-slate-900">
          "{article.title}"
        </h3>

        {variant === 'relaxed' && (
          <div className="mt-3 flex w-full items-center justify-between border-t border-slate-50 pt-3">
            <span className="text-xs font-bold text-slate-300">
              잠시 짬내서 읽어보기
            </span>
            <ChevronRight size={14} className="text-slate-200" />
          </div>
        )}
      </div>

      <div className="mt-1 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 opacity-60 grayscale">
        {article.thumbnailUrl ? (
          <img
            src={article.thumbnailUrl}
            className="h-full w-full object-cover"
            alt=""
          />
        ) : (
          <FileText size={24} className="text-slate-300" />
        )}
      </div>
    </Link>
  );
}
