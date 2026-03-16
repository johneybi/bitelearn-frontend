import type { Meta, StoryObj } from '@storybook/react-vite';

import { DASHBOARD_CATEGORIES } from '@/mock/dashboard';

import DashboardCategoryCard from './DashboardCategoryCard';

const meta = {
  title: 'Dashboard/DashboardCategoryCard',
  component: DashboardCategoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    category: DASHBOARD_CATEGORIES[0],
    onClick: () => {},
  },
} satisfies Meta<typeof DashboardCategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-[180px]">
      <DashboardCategoryCard {...args} />
    </div>
  ),
};
