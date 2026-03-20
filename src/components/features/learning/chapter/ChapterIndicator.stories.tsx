import type { Meta, StoryObj } from '@storybook/react-vite';
import ChapterIndicator from './ChapterIndicator';

const vocabSteps = [
  { type: 'vocab' as const, status: 'none' as const, isCurrent: true },
  { type: 'vocab' as const, status: 'none' as const, isCurrent: false },
  { type: 'vocab' as const, status: 'none' as const, isCurrent: false },
];

const quizPendingSteps = [
  { type: 'quiz' as const, status: 'none' as const, isCurrent: true },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: false },
];

const quizCorrectSteps = [
  { type: 'quiz' as const, status: 'correct' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'none' as const, isCurrent: true },
  { type: 'quiz' as const, status: 'incorrect' as const, isCurrent: false },
];

const quizResultSteps = [
  { type: 'quiz' as const, status: 'correct' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'incorrect' as const, isCurrent: false },
  { type: 'quiz' as const, status: 'correct' as const, isCurrent: true },
];

const meta = {
  title: 'Learning/Chapter/ChapterIndicator',
  component: ChapterIndicator,
  tags: ['autodocs'],
} satisfies Meta<typeof ChapterIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vocab: Story = {
  args: {
    steps: vocabSteps,
    variant: 'vocab',
  },
};

export const QuizPending: Story = {
  args: {
    steps: quizPendingSteps,
    variant: 'quiz',
  },
};

export const QuizMixed: Story = {
  args: {
    steps: quizCorrectSteps,
    variant: 'quiz',
  },
};

export const QuizCurrentResult: Story = {
  args: {
    steps: quizResultSteps,
    variant: 'quiz',
  },
};
