import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ArticleThumb from './ArticleThumb';

const meta = {
  title: 'Article/ArticleThumb',
  component: ArticleThumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    category: '부동산/주거',
  },
} satisfies Meta<typeof ArticleThumb>;

export default meta;
type Story = StoryObj<typeof meta>;
type ArticleThumbProps = ComponentProps<typeof ArticleThumb>;

function renderInFrame(args: ArticleThumbProps) {
  return (
    <div className="mx-auto h-56 w-full max-w-sm overflow-hidden rounded-[28px] border border-slate-100 bg-white">
      <ArticleThumb {...args} />
    </div>
  );
}

export const Default: Story = {
  render: (args) => renderInFrame(args),
};
