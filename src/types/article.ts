export type BookmarkedArticleItem = {
  id: string;
  articleId: string;
  bookmarkedAt: string;
};

export type ArticleListItem = {
  articleId: string;
  category: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  authorName: string;
};
