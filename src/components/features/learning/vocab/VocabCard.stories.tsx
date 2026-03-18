import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { MOCK_CHOICE_QUESTION_SET } from '@/mock/choiceQuestion';

import VocabCard from './VocabCard';

const sampleVocab = MOCK_CHOICE_QUESTION_SET.questions.find(
  (question) => question.type === 'vocab'
);

if (!sampleVocab) {
  throw new Error('Vocab card story fixture not found');
}

const meta = {
  title: 'Learning/Vocab/VocabCard',
  component: VocabCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    vocab: sampleVocab,
    isFlipped: false,
    onFlip: () => {},
  },
} satisfies Meta<typeof VocabCard>;

export default meta;
type Story = StoryObj<typeof meta>;
type VocabCardProps = ComponentProps<typeof VocabCard>;

function renderCard(args: VocabCardProps) {
  return (
    <div className="mx-auto h-[480px] w-full max-w-[320px]">
      <VocabCard {...args} />
    </div>
  );
}

export const Front: Story = {
  render: (args) => renderCard(args),
};

export const Back: Story = {
  render: (args) => renderCard(args),
  args: {
    isFlipped: true,
  },
};
