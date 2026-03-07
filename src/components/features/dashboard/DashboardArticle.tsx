import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/features/article/ArticleCard';
import type { ArticleDetail } from '@/mock/article';

type DashboardArticleProps = {
  articles: ArticleDetail[];
  onMoreClick: () => void;
  onSelectArticle: (articleId: string) => void;
};

export default function DashboardArticle({
  articles,
  onMoreClick,
  onSelectArticle,
}: DashboardArticleProps) {
  const previewArticles = articles.slice(0, 2);

  if (previewArticles.length === 0) return null;

  return (
    <section className="mb-8 mt-12">
      <div className="mb-6 flex items-center justify-between px-1">
        <h3 className="text-lg font-bold tracking-tight text-slate-900">
          유용한 지식 아티클 ✨
        </h3>

        <Button
          type="button"
          variant="link"
          size="sm"
          className="h-auto p-0 text-xs font-bold text-slate-400 hover:text-slate-900"
          onClick={onMoreClick}
        >
          전체보기
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {previewArticles.map((article) => (
          <ArticleCard
            key={article.articleId}
            article={article}
            onSelect={onSelectArticle}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}
