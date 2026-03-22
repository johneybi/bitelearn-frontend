import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import NoteTopNav from './NoteTopNav';

const meta = {
  title: 'Note/NoteTopNav',
  component: NoteTopNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    activeTab: 'incorrect',
    onChangeTab: () => {},
  },
} satisfies Meta<typeof NoteTopNav>;

export default meta;
type Story = StoryObj<typeof meta>;
type NoteTopNavProps = ComponentProps<typeof NoteTopNav>;

function renderTopNav(args: NoteTopNavProps) {
  return (
    <div className="min-h-[140px] bg-white">
      <NoteTopNav {...args} />
    </div>
  );
}

export const IncorrectActive: Story = {
  render: (args) => renderTopNav(args),
};

export const BookmarkActive: Story = {
  render: (args) => renderTopNav(args),
  args: {
    activeTab: 'bookmark',
  },
};
