import type { Meta, StoryObj } from '@storybook/react-vite';

import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';
import { MISTAKE_ITEMS } from '@/mock/mistakeNote';

import ReviewMistakeList from './ReviewMistakeList';

const reviewCategories = MOCK_CATEGORY_CHAPTERS.map((category) => ({
  categoryId: category.categoryId,
  categoryName: category.categoryName,
}));

const meta = {
  title: 'Note/ReviewMistakeList',
  component: ReviewMistakeList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    categories: reviewCategories,
    mistakes: MISTAKE_ITEMS,
  },
} satisfies Meta<typeof ReviewMistakeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMistakes: Story = {
  render: (args) => (
    <div className="px-6">
      <ReviewMistakeList {...args} />
    </div>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <div className="px-6">
      <ReviewMistakeList {...args} />
    </div>
  ),
  args: {
    mistakes: [],
  },
};
