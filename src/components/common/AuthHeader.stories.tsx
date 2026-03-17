import type { Meta, StoryObj } from '@storybook/react-vite';

import AuthHeader from './AuthHeader';

const meta: Meta<typeof AuthHeader> = {
  title: 'Common/AuthHeader',
  component: AuthHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Title',
    showBackButton: true,
    onBackClick: () => {},
    onCloseClick: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof AuthHeader>;

export const BackButton: Story = {};

export const CloseButton: Story = {
  args: {
    showBackButton: false,
    showCloseButton: true,
    title: undefined,
  },
};
