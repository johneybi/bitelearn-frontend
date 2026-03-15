import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';

import StageNode from './StageNode';

const roadmapChapters = MOCK_CATEGORY_CHAPTERS[0].chapters;
const completedChapter =
  roadmapChapters.find((chapter) => chapter.status === 'completed') ??
  roadmapChapters[0];
const inProgressChapter =
  roadmapChapters.find((chapter) => chapter.status === 'in_progress') ??
  roadmapChapters[0];
const availableChapter =
  roadmapChapters.find((chapter) => chapter.status === 'available') ??
  roadmapChapters[0];
const lockedChapter =
  roadmapChapters.find((chapter) => chapter.status === 'locked') ??
  roadmapChapters[0];

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
type StageNodeProps = ComponentProps<typeof StageNode>;

function renderNode(args: StageNodeProps) {
  return (
    <div className="flex min-h-[180px] items-start justify-center p-6">
      <StageNode {...args} />
    </div>
  );
}

export const Completed: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: completedChapter,
  },
};

export const InProgress: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: inProgressChapter,
  },
};

export const Available: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: availableChapter,
  },
};

export const Locked: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: lockedChapter,
  },
};
