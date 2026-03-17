import type { Meta, StoryObj } from '@storybook/react-vite';

import ArticleDetailHeader from './ArticleDetailHeader';

const meta = {
  title: 'Article/ArticleDetailHeader',
  component: ArticleDetailHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    onBack: () => {},
    title: '전세사기 방지 필수 체크리스트',
    articleId: 'article-2026-001',
  },
} satisfies Meta<typeof ArticleDetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SharePopoverOpen: Story = {
  args: {
    sharePopoverOpen: true,
  },
};
