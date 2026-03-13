import type { Meta, StoryObj } from '@storybook/react-vite';
import QuizPassage from './QuizPassage';

const baseArgs = {
  questionText:
    '이사 당일 보증금을 지키기 위해 반드시 같은 날 완료해야 하는 절차는?',
  questionNumber: 8,
  passage:
    '[Scene 1-3: 이사 당일 골든타임] 이사 당일에 전입신고와 확정일자를 같이 처리해야 우선순위를 확보할 수 있습니다.',
  flavorText: '집들이는 전입신고와 확정일자까지 끝낸 뒤에 하는 게 안전합니다.',
};

const meta = {
  title: 'Learning/Quiz/Shared/QuizPassage',
  component: QuizPassage,
  tags: ['autodocs'],
} satisfies Meta<typeof QuizPassage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QuestionPassageFlavorVisible: Story = {
  args: { ...baseArgs },
};
