export type RecentLearning = {
  categoryId: string;
  chapterId: string;
  category: string;
  chapterTitle: string;
  progressPercent: number;
};

export type DashboardCategory = {
  id: string;
  emoji: string;
  name: string;
  chapterCount: number;
  progressPercent: number;
};

export type DashboardRecommendation = {
  categoryId: string;
  chapterId: string;
  category: string;
  title: string;
  estimatedMinutes: number;
};
