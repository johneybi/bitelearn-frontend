import type { Meta, StoryObj } from '@storybook/react-vite';
import MultipleChoiceView from './MultipleChoiceView';

const baseArgs = {
  questionNumber: 8,
  question: '이사 당일 보증금을 지키기 위해 반드시 같은 날 완료해야 하는 절차는?',
  choices: [
    '짐 정리 후 며칠 안에 전입신고',
    '잔금 입금 후 당일 전입신고 + 확정일자',
    '집들이 후 다음 주 전입신고',
    '집주인 영수증만 받으면 충분',
  ],
  selectedValue: '',
  onSelectChoice: () => {},
  onCheckAnswer: () => {},
  isChecking: false,
  correctIndex: 1,
  onPrevious: () => {},
};

const meta = {
  title: 'Learning/Quiz/Choices/MultipleChoiceView',
  component: MultipleChoiceView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MultipleChoiceView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IdleUnselected: Story = {
  args: { ...baseArgs },
};

export const ChoiceSelectedReadyToSubmit: Story = {
  args: {
    ...baseArgs,
    selectedValue: '1',
    isChecking: false,
  },
};

export const CorrectChoiceChecking: Story = {
  args: {
    ...baseArgs,
    selectedValue: '1',
    isChecking: true,
  },
};

export const IncorrectChoiceChecking: Story = {
  args: {
    ...baseArgs,
    selectedValue: '0',
    isChecking: true,
  },
};
