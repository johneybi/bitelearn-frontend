import type { Meta, StoryObj } from '@storybook/react-vite';

import ReviewMistakeList from './ReviewMistakeList';

const sampleCategories = [
  { categoryId: 'investment', categoryName: '투자' },
  { categoryId: 'finance', categoryName: '금융' },
];

const sampleMistakes = [
  {
    id: 'm-1',
    categoryId: 'investment',
    chapterTitle: 'ISA & 연금저축 절세 투자',
    question: 'ISA 계좌의 비과세 한도를 고르는 기준으로 가장 적절한 것은?',
    wrongAt: '2026-03-17T09:00:00Z',
  },
  {
    id: 'm-2',
    categoryId: 'finance',
    chapterTitle: '실업급여 & 고용보험',
    question: '실업급여 수급 조건 중 피보험 단위기간 요건은?',
    wrongAt: '2026-03-16T15:00:00Z',
  },
];

const meta = {
  title: 'Note/ReviewMistakeList',
  component: ReviewMistakeList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    categories: sampleCategories,
    mistakes: sampleMistakes,
  },
} satisfies Meta<typeof ReviewMistakeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="px-6">
      <ReviewMistakeList {...args} />
    </div>
  ),
  args: {
    hasNext: true,
  },
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

export const Loading: Story = {
  render: (args) => (
    <div className="px-6">
      <ReviewMistakeList {...args} />
    </div>
  ),
  args: {
    isLoading: true,
    mistakes: [],
  },
};

export const LoadingMore: Story = {
  render: (args) => (
    <div className="px-6">
      <ReviewMistakeList {...args} />
    </div>
  ),
  args: {
    isLoadingMore: true,
    hasNext: true,
  },
};

export const EndOfList: Story = {
  render: (args) => (
    <div className="px-6">
      <ReviewMistakeList {...args} />
    </div>
  ),
  args: {
    hasNext: false,
  },
};
