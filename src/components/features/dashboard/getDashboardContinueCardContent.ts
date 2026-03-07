export type RecentLearning = {
  category: string;
  chapterTitle: string;
  progressPercent: number;
};

type DashboardContinueCardContent = {
  category: string;
  chapterTitle: string;
  meta: string;
  progressPercent: number;
};

export function getDashboardContinueCardContent(
  recentLearning: RecentLearning
): DashboardContinueCardContent {
  return {
    category: recentLearning.category,
    chapterTitle: recentLearning.chapterTitle,
    meta: `현재 ${recentLearning.progressPercent}% 완료`,
    progressPercent: recentLearning.progressPercent,
  };
}
