import type { Meta, StoryObj } from '@storybook/react-vite';
import DocumentPassageView from './DocumentPassageView';
import { MOCK_CHOICE_QUESTION_SET, type ChoiceQuestionItem } from '@/mock/choiceQuestion';

const documentPassageQuestion = MOCK_CHOICE_QUESTION_SET.questions.find(
  (q) => q.passageMode === 'document' && q.choiceMode === 'multiple' && !!q.documentCard
);

if (!documentPassageQuestion) {
  throw new Error('Document passage story fixture not found');
}

const meta = {
  title: 'Learning/Quiz/Passage/DocumentPassageView',
  component: DocumentPassageView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocumentPassageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocumentCardVisible: Story = {
  args: {
    question: documentPassageQuestion as ChoiceQuestionItem,
    onSolve: () => {},
  },
};
