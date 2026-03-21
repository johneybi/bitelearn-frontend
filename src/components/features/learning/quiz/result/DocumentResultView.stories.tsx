import type { Meta, StoryObj } from '@storybook/react-vite';
import type { StepIndicatorInfo } from '../quiz.types';
import DocumentResultView from './DocumentResultView';

const indicatorSteps: StepIndicatorInfo[] = [
  { type: 'quiz', status: 'correct', isCurrent: false },
  { type: 'quiz', status: 'incorrect', isCurrent: true },
  { type: 'quiz', status: 'none', isCurrent: false },
];

const documentCard = {
  header: '등 기 사 항 전 부 증 명 서',
  subHeader: '토지 및 건물 — 가상 문서',
  fields: [
    { label: '소재지', value: '햇살동 100번지 뼈다귀 하우스' },
    { label: '소유자', value: '불독 (800101-*******)' },
    { label: '순위번호', value: '2번' },
    { label: '등기목적', value: '가압류' },
    {
      label: '권리자 및 기타',
      value: '채권자 개굴개굴은행\n청구금액 50,000,000원',
    },
  ],
};

const baseArgs = {
  isCorrect: true,
  explanation: '갑구에 가압류가 보이면 계약을 멈추고 다른 매물을 확인해야 합니다.',
  documentCard,
  correctIndex: 3,
  selectedAnswerIndex: 3,
  characterImageUrl: '/images/character/dog_perfect.png',
  indicatorSteps,
  isLastQuestion: false,
  onNext: () => {},
};

const meta = {
  title: 'Learning/Quiz/Result/DocumentClickResultView',
  component: DocumentResultView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocumentResultView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CorrectAnswerState: Story = {
  args: {
    ...baseArgs,
    isCorrect: true,
    selectedAnswerIndex: 3,
  },
};

export const IncorrectAnswerState: Story = {
  args: {
    ...baseArgs,
    isCorrect: false,
    selectedAnswerIndex: 0,
    characterImageUrl: '/images/character/dog_fail.png',
    isLastQuestion: true,
  },
};
