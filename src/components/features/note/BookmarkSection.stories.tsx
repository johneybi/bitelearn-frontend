import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { mockArticles } from '@/mock/article';

import BookmarkSection from './BookmarkSection';

const meta = {
  title: 'Note/BookmarkSection',
  component: BookmarkSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/notes']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    articles: mockArticles.slice(0, 2).map((article) => ({
      id: `bookmark-story-${article.articleId}`,
      articleId: article.articleId,
      category: article.category,
      title: article.title,
      thumbnailUrl: article.thumbnailUrl,
      bookmarkedAt: article.publishedAt,
    })),
  },
} satisfies Meta<typeof BookmarkSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="px-6">
      <BookmarkSection {...args} />
    </div>
  ),
  args: {
    hasNext: true,
  },
};

export const Empty: Story = {
  render: (args) => (
    <div className="px-6">
      <BookmarkSection {...args} />
    </div>
  ),
  args: {
    articles: [],
  },
};

export const Loading: Story = {
  render: (args) => (
    <div className="px-6">
      <BookmarkSection {...args} />
    </div>
  ),
  args: {
    isLoading: true,
    articles: [],
  },
};

export const LoadingMore: Story = {
  render: (args) => (
    <div className="px-6">
      <BookmarkSection {...args} />
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
      <BookmarkSection {...args} />
    </div>
  ),
  args: {
    hasNext: false,
  },
};
