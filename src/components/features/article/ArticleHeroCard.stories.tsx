import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ArticleCardItem } from '@/mock/article';

import ArticleHeroCard from './ArticleHeroCard';

const featuredArticle: ArticleCardItem = {
  articleId: 'article-story-hero',
  title:
    '전세사기 방지 필수 체크리스트 | 계약 전 확인, 특약 작성, 보증보험까지',
  thumbnailUrl: '/images/article/article_thumbnail.png',
  authorName: '에디터 샐리',
  publishedAt: '2026-03-05T10:00:00Z',
};

const meta = {
  title: 'Article/ArticleHeroCard',
  component: ArticleHeroCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    article: featuredArticle,
    onSelect: () => {},
  },
} satisfies Meta<typeof ArticleHeroCard>;

export default meta;
type Story = StoryObj<typeof meta>;
type ArticleHeroCardProps = ComponentProps<typeof ArticleHeroCard>;

function renderInWidth(widthClassName: string, args: ArticleHeroCardProps) {
  return (
    <div className={`mx-auto w-full ${widthClassName}`}>
      <ArticleHeroCard {...args} />
    </div>
  );
}

export const Base: Story = {
  render: (args) => renderInWidth('max-w-sm', args),
};

export const LongTitle: Story = {
  render: (args) => renderInWidth('max-w-sm', args),
  args: {
    article: {
      ...featuredArticle,
      articleId: 'article-story-hero-long',
      title:
        '사회초년생이 계약 전에 꼭 알아야 할 전세 사기 예방 포인트와 실제로 체크해야 하는 서류 정리',
    },
  },
};
