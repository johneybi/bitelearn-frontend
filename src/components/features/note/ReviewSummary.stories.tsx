import type { Meta, StoryObj } from '@storybook/react-vite';

import ReviewSummary from './ReviewSummary';

const meta = {
  title: 'Note/ReviewSummary',
  component: ReviewSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    pendingReviewCount: 5,
    totalExp: 1250,
    animateCharacter: false,
  },
} satisfies Meta<typeof ReviewSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ReviewSummary {...args} />,
};

export const EmptyReview: Story = {
  render: (args) => <ReviewSummary {...args} />,
  args: {
    pendingReviewCount: 0,
  },
};
