import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ArticleDetail } from '@/mock/article';

import ArticleHeroCard from './ArticleHeroCard';

const featuredArticle: ArticleDetail = {
  articleId: 'article-story-hero',
  category: '부동산/주거',
  title:
    '전세사기 방지 필수 체크리스트 | 계약 전 확인, 특약 작성, 보증보험까지',
  thumbnailUrl: '/images/article/article_thumbnail.png',
  author: {
    name: '에디터 샐리',
    role: '주거 안전 어드바이저',
    profileImageUrl: '/images/article/article_author_avatar.png',
  },
  publishedAt: '2026-03-05T10:00:00Z',
  viewCount: 12504,
  tags: ['전세사기', '보증보험'],
  summary: {
    title: '내 보증금 완벽하게 지켜내는 TIP!',
    points: ['계약 전 핵심 체크 포인트를 빠르게 살펴봐요.'],
  },
  contentBlocks: [
    {
      type: 'paragraph',
      content: '대표 카드 레이아웃을 보기 위한 스토리북용 예시 데이터입니다.',
    },
  ],
  callToAction: {
    text: '내 전세집 안전도 진단하기',
    url: '/safety-check',
    style: 'primary',
  },
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

function renderInWidth(widthClassName: string, args: Story['args']) {
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
