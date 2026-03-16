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
  },
} satisfies Meta<typeof ArticleDetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
