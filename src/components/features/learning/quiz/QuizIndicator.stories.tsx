import type { Meta, StoryObj } from '@storybook/react-vite';
import QuizIndicator from './QuizIndicator';

const currentVocabSteps = [
  { type: 'vocab' as const, status: 'none' as const, isCurrent: true },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
];

const pendingSteps = [
  { type: 'vocab' as const, status: 'none' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: true },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
];

const previousCorrectSteps = [
  { type: 'vocab' as const, status: 'none' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'correct' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: true },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
];

const previousIncorrectSteps = [
  { type: 'vocab' as const, status: 'none' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'incorrect' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: true },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
];

const meta = {
  title: 'Learning/Quiz/QuizIndicator',
  component: QuizIndicator,
  tags: ['autodocs'],
} satisfies Meta<typeof QuizIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentStepPending: Story = {
  args: { steps: pendingSteps },
};

export const CurrentStepVocab: Story = {
  args: { steps: currentVocabSteps },
};

export const PreviousStepCorrect: Story = {
  args: { steps: previousCorrectSteps },
};

export const PreviousStepIncorrect: Story = {
  args: { steps: previousIncorrectSteps },
};
