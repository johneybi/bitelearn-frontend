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
      articleId: article.articleId,
      category: article.category,
      title: article.title,
      thumbnailUrl: article.thumbnailUrl,
    })),
  },
} satisfies Meta<typeof BookmarkSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticles: Story = {
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
