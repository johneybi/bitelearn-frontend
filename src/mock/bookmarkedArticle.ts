import { mockArticles } from '@/mock/article';

export type BookmarkedArticleItem = {
  id: string;
  articleId: string;
  bookmarkedAt: string;
};

export type BookmarkedArticleCardItem = {
  id: string;
  articleId: string;
  category: string;
  title: string;
  thumbnailUrl: string;
  bookmarkedAt: string;
};

export const BOOKMARKED_ARTICLES: BookmarkedArticleItem[] = Array.from(
  { length: 24 },
  (_, i) => ({
    id: `bookmark-${i + 1}`,
    articleId: `article-2026-00${(i % 8) + 1}`,
    bookmarkedAt: new Date(Date.now() - i * 1000 * 60 * 60 * 6).toISOString(),
  })
);

// 북마크 mock 데이터를 화면용 카드 형태로 동기 변환
export function getMockBookmarkedArticles(): BookmarkedArticleCardItem[] {
  const sortedBookmarks = [...BOOKMARKED_ARTICLES].sort(
    (a, b) =>
      new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
  );

  return sortedBookmarks
    .map((bookmark) => {
      const article = mockArticles.find(
        (articleItem) => articleItem.articleId === bookmark.articleId
      );

      if (!article) return null;

      return {
        id: bookmark.id,
        articleId: article.articleId,
        category: article.category,
        title: article.title,
        thumbnailUrl: article.thumbnailUrl,
        bookmarkedAt: bookmark.bookmarkedAt,
      };
    })
    .filter((item): item is BookmarkedArticleCardItem => item !== null);
}
