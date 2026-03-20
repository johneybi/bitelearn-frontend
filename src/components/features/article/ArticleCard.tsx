import { ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type {
  ArticleDetail,
  ArticleListItem,
} from '@/mock/article';

type ArticleCardProps = {
  article: ArticleListItem | ArticleDetail;
  onSelect: (articleId: string) => void;
  variant?: 'relaxed' | 'compact';
};

export default function ArticleCard({
  article,
  onSelect,
  variant = 'relaxed',
}: ArticleCardProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => onSelect(article.articleId)}
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
    </Button>
  );
}
