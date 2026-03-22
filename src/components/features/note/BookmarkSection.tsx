import { Bookmark } from 'lucide-react';
import ArticleCard from '@/components/features/article/ArticleCard';
import type { BookmarkedArticleCardItem } from '@/mock/bookmarkedArticle';

export default function BookmarkSection({
  articles,
}: {
  articles: BookmarkedArticleCardItem[];
}) {
  if (articles.length === 0) {
    return (
      <div className="px-5 pt-8">
        <div className="border-slate-100 py-20 text-center">
          <Bookmark size={32} className="mx-auto mb-4 text-slate-200" />
          <p className="text-sm font-bold text-slate-400">
            아직 저장한 글이 없어요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-8">
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.articleId}
            article={article}
            variant="article"
          />
        ))}
      </div>
    </div>
  );
}
