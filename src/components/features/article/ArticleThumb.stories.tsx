import type { Meta, StoryObj } from '@storybook/react-vite';

import ArticleThumb from './ArticleThumb';

const meta = {
  title: 'Article/ArticleThumb',
  component: ArticleThumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ArticleThumb>;

export default meta;
type Story = StoryObj<typeof meta>;
function renderInFrame() {
  return (
    <div className="mx-auto h-56 w-full max-w-sm overflow-hidden rounded-[28px] border border-slate-100 bg-white">
      <ArticleThumb />
    </div>
  );
}

export const Default: Story = {
  render: () => renderInFrame(),
};
