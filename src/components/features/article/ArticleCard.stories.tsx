import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import type { ArticleCardItem } from '@/mock/article';

import ArticleCard from './ArticleCard';

const sampleArticle: ArticleCardItem = {
  articleId: 'article-story-001',
  title: '신용점수 800 만들기 - 지금 당장 할 수 있는 5가지',
  thumbnailUrl: '/images/article/article_thumbnail.png',
  authorName: '에디터 민준',
  publishedAt: '2026-03-10T09:00:00Z',
};

const meta = {
  title: 'Article/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    article: sampleArticle,
    variant: 'article',
  },
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;
type ArticleCardProps = ComponentProps<typeof ArticleCard>;

function renderInWidth(widthClassName: string, args: ArticleCardProps) {
  return (
    <MemoryRouter initialEntries={['/articles']}>
      <div className={`mx-auto w-full ${widthClassName}`}>
        <ArticleCard {...args} />
      </div>
    </MemoryRouter>
  );
}

export const ArticleBase: Story = {
  render: (args) => renderInWidth('max-w-sm', args),
};

export const HomeBase: Story = {
  render: (args) => renderInWidth('max-w-sm', args),
  args: {
    variant: 'home',
  },
};

export const ArticleWithoutThumbnail: Story = {
  render: (args) => renderInWidth('max-w-sm', args),
  args: {
    article: {
      ...sampleArticle,
      articleId: 'article-story-002',
      thumbnailUrl: '',
      title: '썸네일이 없어도 정보를 잘 전달하는 아티클 카드',
    },
  },
};
