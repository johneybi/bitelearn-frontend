import type { Meta, StoryObj } from '@storybook/react-vite';
import ChoiceResultView from './ChoiceResultView';

const baseArgs = {
  isCorrect: true,
  correctAnswerText: '잔금 입금 후 당일 전입신고 + 확정일자',
  selectedAnswerText: '잔금 입금 후 당일 전입신고 + 확정일자',
  explanation:
    '이사 당일 잔금을 치르고, 같은 날 주민센터에서 전입신고와 확정일자를 모두 받아야 우선순위를 지킬 수 있습니다.',
  characterImageUrl: '/images/character/dog_perfect.png',
  isLastQuestion: false,
  onNext: () => {},
};

const meta = {
  title: 'Learning/Quiz/Result/ChoiceResultView',
  component: ChoiceResultView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ChoiceResultView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CorrectAnswerState: Story = {
  args: {
    ...baseArgs,
    isCorrect: true,
  },
};

export const IncorrectAnswerState: Story = {
  args: {
    ...baseArgs,
    isCorrect: false,
    selectedAnswerText: '짐 정리 후 며칠 안에 전입신고',
    characterImageUrl: '/images/character/dog_fail.png',
    isLastQuestion: true,
  },
};
