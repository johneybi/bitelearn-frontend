import type { Meta, StoryObj } from '@storybook/react-vite';
import ConversationPassageView from './ConversationPassageView';
import { MOCK_CHOICE_QUESTION_SET, type ChoiceQuestionItem } from '@/mock/choiceQuestion';

const conversationQuestion = MOCK_CHOICE_QUESTION_SET.questions.find(
  (q) => q.passageMode === 'conversation' && q.choiceMode === 'multiple'
);

if (!conversationQuestion) {
  throw new Error('Conversation passage story fixture not found');
}

const baseArgs = {
  question: conversationQuestion as ChoiceQuestionItem,
  onSolve: () => {},
};

const meta = {
  title: 'Learning/Quiz/Passage/ConversationPassageView',
  component: ConversationPassageView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ConversationPassageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BubbleRevealAnimating: Story = {
  args: { ...baseArgs, skipAnimation: false },
};

export const AllBubblesVisible: Story = {
  args: { ...baseArgs, skipAnimation: true },
};
