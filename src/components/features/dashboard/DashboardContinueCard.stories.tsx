import type { Meta, StoryObj } from '@storybook/react-vite';

import DashboardContinueCard from './DashboardContinueCard';

const meta = {
  title: 'Dashboard/DashboardContinueCard',
  component: DashboardContinueCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    category: '부동산 · 주거',
    chapterTitle: '전세사기 예방 기초',
    meta: '현재 68% 완료',
    progressPercent: 68,
    onContinue: () => {},
  },
} satisfies Meta<typeof DashboardContinueCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <DashboardContinueCard {...args} />
    </div>
  ),
};

export const WithoutProgress: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <DashboardContinueCard {...args} />
    </div>
  ),
  args: {
    progressPercent: null,
    meta: '이어서 학습할 준비가 되었어요',
  },
};
