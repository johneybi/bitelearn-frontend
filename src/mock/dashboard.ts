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
  },
  {
    id: 'finance',
    emoji: '💳',
    name: '생활금융 · 고용',
    chapterCount: 8,
  },
  {
    id: 'career',
    emoji: '💼',
    name: '커리어 · 세무',
    chapterCount: 15,
  },
  {
    id: 'investment',
    emoji: '📈',
    name: '자산운용 · 투자',
    chapterCount: 15,
  },
];

export const DASHBOARD_RECOMMENDATIONS: DashboardRecommendation[] = [
  {
    categoryId: 'real-estate',
    chapterId: '1001',
    categoryName: '부동산 · 주거',
    topicName: '전세',
    chapterTitle: '전세 계약 전 꼭 확인해야 할 체크리스트',
  },
  {
    categoryId: 'finance',
    chapterId: '2001',
    categoryName: '생활금융 · 고용',
    topicName: '월급',
    chapterTitle: '사회초년생을 위한 월급 관리 기초',
  },
];
