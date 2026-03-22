import articleHeroThumbnail from '@/assets/article/hero/thumbnail_article_2026_001.png';
import articleThumbnail003 from '@/assets/article/thumbnail/thumbnail_article_2026_003.png';
import articleThumbnail006 from '@/assets/article/thumbnail/thumbnail_article_2026_006.png';
import articleThumbnail008 from '@/assets/article/thumbnail/thumbnail_article_2026_008.png';
import type { ArticleCardItem } from '@/mock/article';

export type BookmarkedArticleCardItem = ArticleCardItem & {
  id: string;
  bookmarkedAt: string;
};

export const mockBookmarkedArticles: BookmarkedArticleCardItem[] = [
  {
    id: 'bookmark-1',
    articleId: 'article-2026-001',
    title:
      '전세사기 방지 필수 체크리스트 | 계약 전 확인, 특약 작성, 보증보험까지',
    thumbnailUrl: articleHeroThumbnail,
    publishedAt: '2026-03-05T10:00:00Z',
    authorName: '에디터 샐리',
    bookmarkedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'bookmark-2',
    articleId: 'article-2026-003',
    title: '계약서 도장 찍기 1분 전! - 내 보증금 지키는 마법의 특약',
    thumbnailUrl: articleThumbnail003,
    publishedAt: '2026-02-18T10:00:00Z',
    authorName: '에디터 서윤',
    bookmarkedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: 'bookmark-3',
    articleId: 'article-2026-006',
    title: '연말정산 13월의 월급? - 놓치면 손해 보는 공제 항목 TOP 5',
    thumbnailUrl: articleThumbnail006,
    publishedAt: '2026-01-22T10:00:00Z',
    authorName: '에디터 유진',
    bookmarkedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: 'bookmark-4',
    articleId: 'article-2026-008',
    title: '주린이를 위한 포트폴리오 가이드 - 분산 투자의 핵심 노하우',
    thumbnailUrl: articleThumbnail008,
    publishedAt: '2026-01-08T09:00:00Z',
    authorName: '에디터 채원',
    bookmarkedAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
  },
];
