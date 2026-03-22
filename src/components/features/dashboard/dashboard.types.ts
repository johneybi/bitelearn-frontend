export type RecentLearning = {
  categoryId: string;
  chapterId: string;
  categoryName: string;
  topicName: string;
  chapterTitle: string;
  progressPercent: number;
};

export type DashboardCategory = {
  id: string;
  emoji: string;
  name: string;
  chapterCount: number;
};

export type DashboardRecommendation = {
  categoryId: string;
  chapterId: string;
  categoryName: string;
  topicName: string;
  chapterTitle: string;
};
