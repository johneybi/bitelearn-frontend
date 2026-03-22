import type { Meta, StoryObj } from '@storybook/react-vite';

import IncorrectSummary from './IncorrectSummary';

const meta = {
  title: 'Note/IncorrectSummary',
  component: IncorrectSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    pendingReviewCount: 5,
    totalBytes: 1250,
  },
} satisfies Meta<typeof IncorrectSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <IncorrectSummary {...args} />,
};

export const EmptyIncorrect: Story = {
  render: (args) => <IncorrectSummary {...args} />,
  args: {
    pendingReviewCount: 0,
  },
};
