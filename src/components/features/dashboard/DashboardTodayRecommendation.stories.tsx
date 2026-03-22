import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { DASHBOARD_RECOMMENDATIONS } from '@/mock/dashboard';

import DashboardTodayRecommendation from './DashboardTodayRecommendation';

const meta = {
  title: 'Dashboard/DashboardTodayRecommendation',
  component: DashboardTodayRecommendation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    recommendations: DASHBOARD_RECOMMENDATIONS,
  },
} satisfies Meta<typeof DashboardTodayRecommendation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={['/']}>
      <div className="px-6">
        <DashboardTodayRecommendation {...args} />
      </div>
    </MemoryRouter>
  ),
};
