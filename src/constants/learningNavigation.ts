import type {
  Category,
  Topic,
} from '@/api/learning/learning.types';

export type LearningTopicMeta = {
  id: string;
  code: Topic;
  name: string;
};

export type LearningCategoryMeta = {
  id: string;
  code: Category;
  name: string;
  emoji: string;
  tagline: string;
  topics: LearningTopicMeta[];
};

export const LEARNING_NAVIGATION: LearningCategoryMeta[] = [
  {
    id: 'real-estate',
    code: 'REAL_ESTATE',
    name: '부동산 · 주거',
    emoji: '🏠',
    tagline: '내 보증금, 내가 지킨다',
    topics: [
      { id: 'jeonse', code: 'JEONSE', name: '전세' },
      { id: 'monthly-rent', code: 'MONTHLY_RENT', name: '월세' },
      { id: 'buying', code: 'BUYING', name: '매매' },
    ],
  },
  {
    id: 'finance',
    code: 'FINANCE',
    name: '생활금융 · 고용',
    emoji: '💳',
    tagline: '돈과 일, 내 편으로 만들기',
    topics: [
      { id: 'jeonse', code: 'JEONSE', name: '전세' },
      { id: 'monthly-rent', code: 'MONTHLY_RENT', name: '월세' },
      { id: 'buying', code: 'BUYING', name: '매매' },
    ],
  },
  {
    id: 'law',
    code: 'LAW',
    name: '법률 · 권리',
    emoji: '⚖️',
    tagline: '내 권리, 정확히 알기',
    topics: [
      { id: 'jeonse', code: 'JEONSE', name: '전세' },
      { id: 'monthly-rent', code: 'MONTHLY_RENT', name: '월세' },
      { id: 'buying', code: 'BUYING', name: '매매' },
    ],
  },
];

export function getCategoryMetaByRouteId(categoryId?: string) {
  return LEARNING_NAVIGATION.find((category) => category.id === categoryId);
}
