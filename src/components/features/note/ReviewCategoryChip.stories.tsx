import type { Meta, StoryObj } from '@storybook/react-vite';

import ReviewCategoryChip from './ReviewCategoryChip';

const categoryLabels = [
  '전체',
  '부동산 · 주거',
  '생활금융 · 고용',
  '커리어 · 세무',
  '자산운용 · 투자',
];

const meta = {
  title: 'Note/ReviewCategoryChip',
  component: ReviewCategoryChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    label: '부동산 · 주거',
    isActive: false,
    onClick: () => {},
  },
} satisfies Meta<typeof ReviewCategoryChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllChips: Story = {
  render: () => (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto p-2">
      {categoryLabels.map((label, index) => (
        <ReviewCategoryChip
          key={label}
          label={label}
          isActive={index === 0}
          onClick={() => {}}
        />
      ))}
    </div>
  ),
};

export const Inactive: Story = {};

export const Active: Story = {
  args: {
    isActive: true,
  },
};
