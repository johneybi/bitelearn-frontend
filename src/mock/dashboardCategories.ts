import type { DashboardCategory } from '@/components/features/dashboard/dashboard.types';

export const DASHBOARD_CATEGORIES: DashboardCategory[] = [
  { emoji: '🏠', name: '부동산 · 주거', chapterCount: 12, progressPercent: 72 },
  {
    emoji: '💳',
    name: '생활금융 · 고용',
    chapterCount: 8,
    progressPercent: 38,
  },
  { emoji: '💼', name: '커리어 · 세무', chapterCount: 15, progressPercent: 84 },
  {
    emoji: '📈',
    name: '자산운용 · 투자',
    chapterCount: 15,
    progressPercent: 84,
  },
];
