import type { Meta, StoryObj } from '@storybook/react-vite';

import DashboardHero from './DashboardHero';

const meta = {
  title: 'Dashboard/DashboardHero',
  component: DashboardHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DashboardHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  render: (args) => (
    <div className="px-6 pt-4">
      <DashboardHero {...args} />
    </div>
  ),
  args: {
    variant: 'guest',
  },
};

export const LoggedIn: Story = {
  render: (args) => (
    <div className="px-6 pt-4">
      <DashboardHero {...args} />
    </div>
  ),
  args: {
    variant: 'member',
    nickname: 'BiteLearn',
    currentLevel: 1,
    levelBadgeLabel: '레벨 배지',
  },
};
