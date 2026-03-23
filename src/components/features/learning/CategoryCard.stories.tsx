import type { Meta, StoryObj } from '@storybook/react-vite';

import realEstateIcon from '@/assets/icons/category/real_estate.png';
import { getMockLearningSummaryByCategory } from '@/mock/learning';

import CategoryCard from './CategoryCard';

const summaryByCategory = getMockLearningSummaryByCategory();
const realEstateSummary = summaryByCategory['real-estate'];
const total = realEstateSummary?.total ?? 0;
const progressed = realEstateSummary?.progressed ?? 0;
const progress = total > 0 ? Math.round((progressed / total) * 100) : 0;

const meta = {
  title: 'Learning/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    categoryId: 'real-estate',
    categoryName: '부동산 · 주거',
    categoryTagline: '내 보증금, 내가 지킨다',
    categoryIconSrc: realEstateIcon,
    progress,
    topics: realEstateSummary?.topics ?? [],
    isExpanded: false,
    onToggle: () => {},
    onSelectTopic: () => {},
  },
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    isExpanded: false,
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <CategoryCard {...args} />
    </div>
  ),
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <CategoryCard {...args} />
    </div>
  ),
};

export const NoProgress: Story = {
  args: {
    progress: 0,
    isExpanded: false,
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <CategoryCard {...args} />
    </div>
  ),
};
