import { mockArticles } from '@/mock/article';
import { BOOKMARKED_ARTICLES } from '@/mock/bookmarkedArticle';
import { paginateByCursor } from '@/mock/paginateByCursor';
import { withDelay } from '@/mock/withDelay';
import type { CursorResponse } from '@/api/common/pagination.type';

const DEFAULT_SIZE = 10;

export type BookmarkedArticleCardItem = {
  id: string;
  articleId: string;
  category: string;
  title: string;
  thumbnailUrl: string;
  bookmarkedAt: string;
};

type FetchBookmarkedArticlesParams = {
  cursor?: string | null; // 현재 페이지의 cursor
  pageSize?: number; // 한 번에 가져올 아이템 수
};

export async function fetchBookmarkedArticles({
  cursor,
  pageSize = DEFAULT_SIZE,
}: FetchBookmarkedArticlesParams): Promise<
  CursorResponse<BookmarkedArticleCardItem>
> {
  // 최신 북마크가 먼저 보이도록 bookmarkedAt 기준 내림차순 정렬
  const sortedBookmarks = [...BOOKMARKED_ARTICLES].sort(
    (a, b) =>
      new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
  );

  // 현재 cursor 기준으로 pageSize만큼 잘라낸 뒤 nextCursor / hasNext를 계산
  const paginatedBookmarks = paginateByCursor({
    cursor,
    pageSize,
    items: sortedBookmarks,
    getCursor: (item) => item.bookmarkedAt,
  });

  // 페이지에 포함된 북마크를 아티클 정보와 매핑해 카드 데이터 형태로 변환
  const mappedBookmarks = paginatedBookmarks.items
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

  return withDelay({
    items: mappedBookmarks,
    nextCursor: paginatedBookmarks.nextCursor,
    hasNext: paginatedBookmarks.hasNext,
  });
}
