import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import type { ArticleDetail } from '@/mock/article';

import ArticleCard from './ArticleCard';

const sampleArticle: ArticleDetail = {
  articleId: 'article-story-001',
  category: '생활금융·고용',
  title: '신용점수 800 만들기 - 지금 당장 할 수 있는 5가지',
  thumbnailUrl: '/images/article/article_thumbnail.png',
  author: {
    name: '에디터 민준',
    role: '금융 리터러시 큐레이터',
    profileImageUrl: '',
  },
  publishedAt: '2026-03-10T09:00:00Z',
  viewCount: 15302,
  tags: ['신용점수', '금융'],
  summary: {
    title: '핵심 요약',
    points: ['연체를 피하고 사용률을 관리하세요.'],
  },
  contentBlocks: [
    {
      type: 'paragraph',
      content: '스토리북에서 카드 UI를 확인하기 위한 샘플 본문입니다.',
    },
  ],
  callToAction: {
    text: '챕터 바로 시작하기',
    url: '/learn',
    style: 'primary',
  },
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
