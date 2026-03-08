import type {
  DashboardCategory,
  DashboardRecommendation,
} from '@/components/features/dashboard/dashboard.types';

export const DASHBOARD_CATEGORIES: DashboardCategory[] = [
  {
    id: 'real-estate',
    emoji: '🏠',
    name: '부동산 · 주거',
    chapterCount: 12,
    progressPercent: 72,
  },
  {
    id: 'finance',
    emoji: '💳',
    name: '생활금융 · 고용',
    chapterCount: 8,
    progressPercent: 38,
  },
  {
    id: 'career',
    emoji: '💼',
    name: '커리어 · 세무',
    chapterCount: 15,
    progressPercent: 84,
  },
  {
    id: 'investment',
    emoji: '📈',
    name: '자산운용 · 투자',
    chapterCount: 15,
    progressPercent: 84,
  },
];

export const DASHBOARD_RECOMMENDATIONS: DashboardRecommendation[] = [
  {
    categoryId: 'real-estate',
    chapterId: 'contract_step2',
    category: '부동산 · 주거',
    title: '전세 계약 전 꼭 확인해야 할 체크리스트',
    estimatedMinutes: 5,
  },
  {
    categoryId: 'finance',
    chapterId: 'contract_step2',
    category: '생활금융 · 고용',
    title: '사회초년생을 위한 월급 관리 기초',
    estimatedMinutes: 4,
  },
];
