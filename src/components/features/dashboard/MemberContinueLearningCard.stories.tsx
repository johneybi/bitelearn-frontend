import type { Meta, StoryObj } from '@storybook/react-vite';

import MemberContinueLearningCard from './MemberContinueLearningCard';

const meta = {
  title: 'Dashboard/MemberContinueLearningCard',
  component: MemberContinueLearningCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    recentLearning: {
      categoryId: 'real-estate',
      chapterId: '1',
      categoryName: '부동산 · 주거',
      topicName: '월세',
      chapterTitle: '나의 첫 집 찾아보기',
      progressPercent: 40,
    },
  },
} satisfies Meta<typeof MemberContinueLearningCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <MemberContinueLearningCard {...args} />
    </div>
  ),
};

export const WithoutProgress: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <MemberContinueLearningCard {...args} />
    </div>
  ),
  args: {
    recentLearning: {
      categoryId: 'real-estate',
      chapterId: '1',
      categoryName: '부동산 · 주거',
      topicName: '월세',
      chapterTitle: '나의 첫 집 찾아보기',
      progressPercent: 0,
    },
  },
};
