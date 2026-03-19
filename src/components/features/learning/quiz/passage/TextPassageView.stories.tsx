import type { Meta, StoryObj } from '@storybook/react-vite';
import type { QuizInfo } from '@/api/learning/learning.types';
import TextPassageView from './TextPassageView';

const textPassageQuestion: QuizInfo = {
  quizId: 1,
  sequence: 1,
  type: 'TEXT_MCQ',
  passageTitle: '이사 당일 골든타임',
  passageContent:
    '이사 당일에 전입신고와 확정일자를 같이 처리해야 우선순위를 확보할 수 있습니다.',
  questionImageUrl: '',
  questionTitle: '이사 당일 반드시 같이 처리해야 하는 절차는?',
  specificData: {
    options: [
      '집들이 먼저 하기',
      '전입신고와 확정일자 받기',
      '보증금 일부만 송금하기',
      '관리비 내역 확인하기',
    ],
    dialogues: [],
    documentElements: [],
  },
};

const meta = {
  title: 'Learning/Quiz/Passage/TextPassageView',
  component: TextPassageView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TextPassageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PassageVisible: Story = {
  args: {
    question: textPassageQuestion,
    onSolve: () => {},
  },
};
