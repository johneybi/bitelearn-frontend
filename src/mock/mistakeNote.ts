import type { MistakeItem } from '@/types/mistake';

const categories = ['investment', 'real-estate', 'finance', 'career'];

const chapterTitles = [
  'ISA & 연금저축 절세 투자',
  '계약: 도장 찍기 전 방어선',
  '실업급여 & 고용보험',
  '절세 공제 항목 총정리',
  '등기부등본 완전 해독',
];

const questions = [
  'ISA 계좌의 비과세 한도를 고르는 기준으로 가장 적절한 것은?',
  '계약서 특약에 반드시 포함해야 할 문구는?',
  '실업급여 수급 조건 중 피보험 단위기간 요건은?',
  '연말정산 공제 항목으로 볼 수 없는 것은?',
  '등기부등본에서 근저당권 확인 시 먼저 볼 항목은?',
];

export const MISTAKE_ITEMS: MistakeItem[] = Array.from(
  { length: 50 },
  (_, i) => {
    const index = i + 1;

    return {
      id: `m-${index}`,
      categoryId: categories[i % categories.length],
      chapterTitle: chapterTitles[i % chapterTitles.length],
      question: questions[i % questions.length],
      wrongAt: new Date(
        Date.now() - i * 1000 * 60 * 60 * 3 // 3시간 간격
      ).toISOString(),
    };
  }
);
