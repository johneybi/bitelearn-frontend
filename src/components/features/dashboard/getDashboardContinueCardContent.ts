import type { RecentLearning } from './dashboard.types';

type DashboardContinueCardContent = {
  categoryId: string;
  chapterId: string;
  category: string;
  chapterTitle: string;
  meta: string;
  progressPercent: number;
};

export function getDashboardContinueCardContent(
  recentLearning: RecentLearning
): DashboardContinueCardContent {
  return {
    categoryId: recentLearning.categoryId,
    chapterId: recentLearning.chapterId,
    category: recentLearning.category,
    chapterTitle: recentLearning.chapterTitle,
    meta: `현재 ${recentLearning.progressPercent}% 완료`,
    progressPercent: recentLearning.progressPercent,
  };
}
