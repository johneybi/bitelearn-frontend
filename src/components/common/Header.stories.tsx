import type { Meta, StoryObj } from '@storybook/react-vite';

import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '퀴즈 풀이',
    subtitle: '월세 Chapter 1',
    showCloseButton: true,
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const StackedClose: Story = {};

export const StackedBack: Story = {
  args: {
    showBackButton: true,
    showCloseButton: false,
  },
};

export const CompactBack: Story = {
  args: {
    subtitle: undefined,
    showBackButton: true,
    showCloseButton: false,
    title: '회원가입',
  },
};

export const CompactClose: Story = {
  args: {
    subtitle: undefined,
    showBackButton: false,
    showCloseButton: true,
    title: '로그인',
  },
};
