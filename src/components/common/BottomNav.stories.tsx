import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import BottomNav from './BottomNav';

const meta = {
  title: 'Common/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderBottomNav(path: string) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <div className="min-h-dvh bg-slate-50 pb-32">
        <BottomNav />
      </div>
    </MemoryRouter>
  );
}

export const HomeActive: Story = {
  render: () => renderBottomNav('/'),
};

export const LearningActive: Story = {
  render: () => renderBottomNav('/learning'),
};

export const NotesActive: Story = {
  render: () => renderBottomNav('/notes'),
};

export const ArticlesActive: Story = {
  render: () => renderBottomNav('/articles'),
};

export const MyPageActive: Story = {
  render: () => renderBottomNav('/mypage'),
};
