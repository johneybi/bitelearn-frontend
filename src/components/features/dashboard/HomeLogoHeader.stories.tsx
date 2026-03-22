import type { Meta, StoryObj } from '@storybook/react-vite';

import HomeLogoHeader from './HomeLogoHeader';

const meta = {
  title: 'Dashboard/HomeLogoHeader',
  component: HomeLogoHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomeLogoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-neutral-100">
      <HomeLogoHeader />
    </div>
  ),
};
