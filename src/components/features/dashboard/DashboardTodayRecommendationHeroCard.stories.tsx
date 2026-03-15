import type { Meta, StoryObj } from '@storybook/react-vite';

import { DASHBOARD_RECOMMENDATIONS } from '@/mock/dashboard';

import DashboardTodayRecommendationHeroCard from './DashboardTodayRecommendationHeroCard';

const meta = {
  title: 'Dashboard/DashboardTodayRecommendationHeroCard',
  component: DashboardTodayRecommendationHeroCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    recommendation: DASHBOARD_RECOMMENDATIONS[0],
    onClick: () => {},
  },
} satisfies Meta<typeof DashboardTodayRecommendationHeroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeroOnly: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <DashboardTodayRecommendationHeroCard {...args} />
    </div>
  ),
};
