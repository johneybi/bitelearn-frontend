import careerIcon from '@/assets/icons/category/career.png';
import financeIcon from '@/assets/icons/category/finance.png';
import investmentIcon from '@/assets/icons/category/investment.png';
import realEstateIcon from '@/assets/icons/category/real_estate.png';
import type { Category, Topic } from '@/api/learning/learning.types';

export type LearningTopicMeta = {
  id: string;
  code: Topic;
  name: string;
};

export type LearningCategoryMeta = {
  id: string;
  code: Category;
  name: string;
  iconSrc: string;
  tagline: string;
  topics: LearningTopicMeta[];
};

export const LEARNING_NAVIGATION: LearningCategoryMeta[] = [
  {
    id: 'real-estate',
    code: 'REAL_ESTATE',
    name: '부동산 · 주거',
    iconSrc: realEstateIcon,
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
    iconSrc: financeIcon,
    tagline: '돈과 일, 내 편으로 만들기',
    topics: [
      { id: 'salary', code: 'SALARY', name: '월급 관리' },
      { id: 'credit', code: 'CREDIT', name: '신용 관리' },
      { id: 'employment', code: 'EMPLOYMENT', name: '고용 · 복지' },
    ],
  },
  {
    id: 'career',
    code: 'CAREER',
    name: '커리어 · 세무',
    iconSrc: careerIcon,
    tagline: '세금도 전략이다',
    topics: [
      {
        id: 'salary-negotiation',
        code: 'SALARY_NEGOTIATION',
        name: '연봉 협상',
      },
      { id: 'year-end-tax', code: 'YEAR_END_TAX', name: '연말정산' },
      { id: 'income-tax', code: 'INCOME_TAX', name: '종합소득세' },
    ],
  },
  {
    id: 'investment',
    code: 'INVESTMENT',
    name: '자산운용 · 투자',
    iconSrc: investmentIcon,
    tagline: '투자는 언제나 똑똑히',
    topics: [
      { id: 'etf', code: 'ETF', name: 'ETF' },
      { id: 'stock', code: 'STOCK', name: '주식' },
      { id: 'pension', code: 'PENSION', name: '연금' },
    ],
  },
];

export function getCategoryMetaByRouteId(categoryId?: string) {
  return LEARNING_NAVIGATION.find((category) => category.id === categoryId);
}
