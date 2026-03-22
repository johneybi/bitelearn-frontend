import type { Meta, StoryObj } from '@storybook/react-vite';

import MyBadgeSummaryCard from './MyBadgeSummaryCard';

const meta = {
  title: 'MyPage/MyBadgeSummaryCard',
  component: MyBadgeSummaryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    currentLevel: 1,
    currentBytes: 1250,
  },
} satisfies Meta<typeof MyBadgeSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <MyBadgeSummaryCard {...args} />
    </div>
  ),
};
