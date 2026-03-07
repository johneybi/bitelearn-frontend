export type RecentLearning = {
  category: string;
  chapterTitle: string;
  progressPercent: number;
};

export type DashboardCategory = {
  emoji: string;
  name: string;
  chapterCount: number;
  progressPercent: number;
};

export type DashboardRecommendation = {
  category: string;
  title: string;
  estimatedMinutes: number;
};
