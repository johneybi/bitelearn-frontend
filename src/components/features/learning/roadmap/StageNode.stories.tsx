import type { Meta, StoryObj } from '@storybook/react-vite';

import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';

import StageNode from './StageNode';

const roadmapChapters = MOCK_CATEGORY_CHAPTERS[0].chapters;

const meta = {
  title: 'Learning/Roadmap/StageNode',
  component: StageNode,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    chapter: roadmapChapters[0],
    index: 0,
    onSelect: () => {},
  },
} satisfies Meta<typeof StageNode>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderNode(args: Story['args']) {
  return (
    <div className="flex min-h-[180px] items-start justify-center p-6">
      <StageNode {...args} />
    </div>
  );
}

export const Completed: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: roadmapChapters.find((chapter) => chapter.status === 'completed'),
  },
};

export const InProgress: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: roadmapChapters.find((chapter) => chapter.status === 'in_progress'),
  },
};

export const Available: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: roadmapChapters.find((chapter) => chapter.status === 'available'),
  },
};

export const Locked: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: roadmapChapters.find((chapter) => chapter.status === 'locked'),
  },
};
