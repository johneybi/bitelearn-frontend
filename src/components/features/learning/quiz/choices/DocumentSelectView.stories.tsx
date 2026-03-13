import type { Meta, StoryObj } from '@storybook/react-vite';
import DocumentSelectView from './DocumentSelectView';
import {
  MOCK_CHOICE_QUESTION_SET,
  type ChoiceQuestionItem,
} from '@/mock/choiceQuestion';

const documentSelectQuestion = MOCK_CHOICE_QUESTION_SET.questions.find(
  (q) => q.choiceMode === 'document_select' && !!q.documentCard
);

if (!documentSelectQuestion) {
  throw new Error('Document select story fixture not found');
}

const baseArgs = {
  question: documentSelectQuestion as ChoiceQuestionItem,
  currentIndex: 0,
  selectedValue: '',
  onSelectChoice: () => {},
  onCheckAnswer: () => {},
  isChecking: false,
  onPrevious: () => {},
};

const meta = {
  title: 'Learning/Quiz/Choices/DocumentSelectView',
  component: DocumentSelectView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocumentSelectView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IdleUnselected: Story = {
  args: { ...baseArgs },
};

export const FieldSelectedReadyToSubmit: Story = {
  args: {
    ...baseArgs,
    selectedValue: '1',
    isChecking: false,
  },
};

export const ScanningAfterCorrectSelection: Story = {
  args: {
    ...baseArgs,
    selectedValue: String(documentSelectQuestion.correctIndex),
    isChecking: true,
  },
};

export const ScanningAfterIncorrectSelection: Story = {
  args: {
    ...baseArgs,
    selectedValue: '0',
    isChecking: true,
  },
};
