import type { Meta, StoryObj } from '@storybook/react-vite';

import { DASHBOARD_CATEGORIES } from '@/mock/dashboard';

import DashboardCategoryList from './DashboardCategoryList';

const meta = {
  title: 'Dashboard/DashboardCategoryList',
  component: DashboardCategoryList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    categories: DASHBOARD_CATEGORIES,
    onCategoryClick: () => {},
  },
} satisfies Meta<typeof DashboardCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="px-6">
      <DashboardCategoryList {...args} />
    </div>
  ),
};
