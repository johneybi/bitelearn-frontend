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
      title: article.title,
      thumbnailUrl: article.thumbnailUrl,
      publishedAt: article.publishedAt,
      authorName: article.author.name,
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
