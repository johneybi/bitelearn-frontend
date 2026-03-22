import type { Meta, StoryObj } from '@storybook/react-vite';

import AppLogoHeader from './AppLogoHeader';

const meta = {
  title: 'Dashboard/AppLogoHeader',
  component: AppLogoHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppLogoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-neutral-100">
      <AppLogoHeader />
    </div>
  ),
};
