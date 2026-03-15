import type { Meta, StoryObj } from '@storybook/react-vite';

import { MOCK_CHOICE_QUESTION_SET } from '@/mock/choiceQuestion';

import WordCard from './WordCard';

const sampleWord = MOCK_CHOICE_QUESTION_SET.questions.find(
  (question) => question.type === 'word'
);

const meta = {
  title: 'Learning/Word/WordCard',
  component: WordCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    word: sampleWord,
    isFlipped: false,
    onFlip: () => {},
  },
} satisfies Meta<typeof WordCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderCard(args: Story['args']) {
  return (
    <div className="mx-auto h-[480px] w-full max-w-[320px]">
      <WordCard {...args} />
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
