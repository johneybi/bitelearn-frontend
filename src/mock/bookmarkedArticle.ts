import type { BookmarkedArticleItem } from '@/types/article';

export const BOOKMARKED_ARTICLES: BookmarkedArticleItem[] = Array.from(
  { length: 24 },
  (_, i) => ({
    id: `bookmark-${i + 1}`,
    articleId: `article-2026-00${(i % 8) + 1}`,
    bookmarkedAt: new Date(Date.now() - i * 1000 * 60 * 60 * 6).toISOString(),
  })
);
