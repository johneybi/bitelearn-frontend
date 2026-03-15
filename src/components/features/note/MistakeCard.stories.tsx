import type { Meta, StoryObj } from '@storybook/react-vite';

import MistakeCard from './MistakeCard';

const meta = {
  title: 'Note/MistakeCard',
  component: MistakeCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    categoryLabel: '부동산 · 주거',
    dateText: '2026. 3. 6.',
    chapterTitle: '계약: 도장 찍기 전 방어선',
    question: '계약서 특약에 반드시 포함해야 할 문구는?',
    timeText: '오후 09:42',
    onRetry: () => {},
  },
} satisfies Meta<typeof MistakeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <MistakeCard {...args} />
    </div>
  ),
};
