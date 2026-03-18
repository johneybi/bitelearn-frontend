import type {
  LearningCategoryCode,
  LearningTopicCode,
} from '@/api/learning/learning.types';

export type LearningTopicMeta = {
  id: string;
  code: LearningTopicCode;
  name: string;
};

export type LearningCategoryMeta = {
  id: string;
  code: LearningCategoryCode;
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
      { id: 'wolse', code: 'WOLSE', name: '월세' },
    ],
  },
  {
    id: 'finance',
    code: 'FINANCE',
    name: '생활금융 · 고용',
    emoji: '💳',
    tagline: '돈과 일, 내 편으로 만들기',
    topics: [{ id: 'salary', code: 'SALARY', name: '월급 관리' }],
  },
  {
    id: 'career',
    code: 'CAREER',
    name: '커리어 · 세무',
    emoji: '💼',
    tagline: '세금도 전략이다',
    topics: [{ id: 'tax', code: 'TAX', name: '기초 세무' }],
  },
  {
    id: 'investment',
    code: 'INVESTMENT',
    name: '자산운용 · 투자',
    emoji: '📈',
    tagline: '위험은 줄이고 기회는 키운다',
    topics: [{ id: 'starter', code: 'STARTER', name: '투자 입문' }],
  },
];

export function getCategoryMetaByRouteId(categoryId?: string) {
  return (
    LEARNING_NAVIGATION.find((category) => category.id === categoryId) ??
    LEARNING_NAVIGATION[0]
  );
}

