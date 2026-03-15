import type { Meta, StoryObj } from '@storybook/react-vite';

import DashboardHeader from './DashboardHeader';

const meta = {
  title: 'Dashboard/DashboardHeader',
  component: DashboardHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'BiteLearn',
    subtitle: '로그인하고 맞춤 학습을 시작해보세요.',
    profileButtonLabel: '로그인 화면으로 이동',
    onProfileClick: () => {},
  },
} satisfies Meta<typeof DashboardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  render: (args) => (
    <div className="px-6 pt-4">
      <DashboardHeader {...args} />
    </div>
  ),
};

export const LoggedIn: Story = {
  render: (args) => (
    <div className="px-6 pt-4">
      <DashboardHeader {...args} />
    </div>
  ),
  args: {
    title: '반가워요, BiteLearn님! 👋',
    subtitle: '오늘도 한 입 지식을 챙겨볼까요?',
    profileButtonLabel: '마이페이지로 이동',
  },
};
