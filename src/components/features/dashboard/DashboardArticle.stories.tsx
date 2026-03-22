import type { Meta, StoryObj } from '@storybook/react-vite';

import { mockArticles } from '@/mock/article';

import DashboardArticle from './DashboardArticle';

const meta = {
  title: 'Dashboard/DashboardArticle',
  component: DashboardArticle,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    articles: mockArticles,
  },
} satisfies Meta<typeof DashboardArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="px-6">
      <DashboardArticle {...args} />
    </div>
  ),
};

export const SingleArticle: Story = {
  render: (args) => (
    <div className="px-6">
      <DashboardArticle {...args} />
    </div>
  ),
  args: {
    articles: [mockArticles[0]],
  },
};
