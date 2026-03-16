import type { Meta, StoryObj } from '@storybook/react-vite';

import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';

import CategoryCard from './CategoryCard';

const meta = {
  title: 'Learning/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    cat: MOCK_CATEGORY_CHAPTERS[0],
    onSelect: () => {},
  },
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <CategoryCard {...args} />
    </div>
  ),
};

export const Completed: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <CategoryCard {...args} />
    </div>
  ),
  args: {
    cat: {
      ...MOCK_CATEGORY_CHAPTERS[0],
      completedChapters: MOCK_CATEGORY_CHAPTERS[0].totalChapters,
    },
  },
};
