import type { Meta, StoryObj } from '@storybook/react-vite';
import TextPassageView from './TextPassageView';
import { MOCK_CHOICE_QUESTION_SET, type ChoiceQuestionItem } from '@/mock/choiceQuestion';

const textPassageQuestion = MOCK_CHOICE_QUESTION_SET.questions.find(
  (q) => q.passageMode === 'text' && q.choiceMode === 'multiple'
);

if (!textPassageQuestion) {
  throw new Error('Text passage story fixture not found');
}

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
    question: textPassageQuestion as ChoiceQuestionItem,
    onSolve: () => {},
  },
};
