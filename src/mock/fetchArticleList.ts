import type { CursorResponse } from '@/api/common/pagination.type';
import { mockArticles, type ArticleCategory } from '@/mock/article';
import { paginateByCursor } from '@/mock/paginateByCursor';
import { withDelay } from '@/mock/withDelay';
import type { ArticleListItem } from '@/types/article';

const DEFAULT_SIZE = 10;

type FetchArticleListParams = {
  cursor?: string | null;
  category?: ArticleCategory;
  pageSize?: number;
};

export async function fetchArticleList({
  cursor,
  category,
  pageSize = DEFAULT_SIZE,
}: FetchArticleListParams): Promise<CursorResponse<ArticleListItem>> {
  // 최신 아티클이 먼저 보이도록 publishedAt 기준 내림차순 정렬
  const sortedArticles = [...mockArticles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // 선택된 카테고리 필터 적용
  const filteredArticles =
    !category || category === '전체'
      ? sortedArticles
      : sortedArticles.filter((article) => article.category === category);

  // 화면에서 사용할 ArticleListItem 형태로 변환
  const articleListItems: ArticleListItem[] = filteredArticles.map(
    (article) => ({
      articleId: article.articleId,
      category: article.category,
      title: article.title,
      thumbnailUrl: article.thumbnailUrl,
      publishedAt: article.publishedAt,
      authorName: article.author.name,
    })
  );

  // 현재 cursor 기준으로 pageSize만큼 잘라낸 뒤 nextCursor / hasNext 계산
  const paginatedResult = paginateByCursor<ArticleListItem>({
    cursor,
    pageSize,
    items: articleListItems,
    getCursor: (article) => article.publishedAt,
  });

  return withDelay(paginatedResult);
}
