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
    categoryName: '부동산 · 주거',
    createdAt: '2026-03-06T12:42:00Z',
    topic: 'JEONSE',
    questionTitle: '계약서 특약에 반드시 포함해야 할 문구는?',
    onRetry: () => {},
  },
} satisfies Meta<typeof MistakeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <MistakeCard {...args} />
    </div>
  ),
};
