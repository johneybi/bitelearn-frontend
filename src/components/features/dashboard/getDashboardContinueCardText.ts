export type RecentLearning = {
  category: string;
  chapterTitle: string;
  progressPercent: number;
};

type DashboardContinueCardText = {
  category: string;
  chapterTitle: string;
  meta: string;
  progressPercent: number;
};

export function getDashboardContinueCardText(
  recentLearning: RecentLearning
): DashboardContinueCardText {
  return {
    category: recentLearning.category,
    chapterTitle: recentLearning.chapterTitle,
    meta: `현재 ${recentLearning.progressPercent}% 완료`,
    progressPercent: recentLearning.progressPercent,
  };
}
