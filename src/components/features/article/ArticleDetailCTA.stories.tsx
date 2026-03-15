import type { Meta, StoryObj } from '@storybook/react-vite';

import ArticleDetailCTA from './ArticleDetailCTA';

const meta = {
  title: 'Article/ArticleDetailCTA',
  component: ArticleDetailCTA,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    callToAction: {
      text: '내 전세집 안전도 1분 만에 진단하기',
      style: 'primary',
    },
  },
} satisfies Meta<typeof ArticleDetailCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
