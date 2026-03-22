import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { DASHBOARD_RECOMMENDATIONS } from '@/mock/dashboard';

import DashboardRecommendationCard from './DashboardRecommendationCard';

const meta = {
  title: 'Dashboard/DashboardRecommendationCard',
  component: DashboardRecommendationCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    recommendation: DASHBOARD_RECOMMENDATIONS[0],
  },
} satisfies Meta<typeof DashboardRecommendationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={['/']}>
      <div className="mx-auto w-full max-w-sm">
        <DashboardRecommendationCard {...args} />
      </div>
    </MemoryRouter>
  ),
};
