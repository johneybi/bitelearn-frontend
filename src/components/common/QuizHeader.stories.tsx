import type { Meta, StoryObj } from '@storybook/react-vite';
import QuizHeader from './QuizHeader';

const meta: Meta<typeof QuizHeader> = {
  title: 'Common/QuizHeader',
  component: QuizHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '단어 학습',
    showCloseButton: true,
  },
};

export default meta;

type Story = StoryObj<typeof QuizHeader>;

export const CloseButtonVisible: Story = {};

export const CloseButtonHidden: Story = {
  args: {
    showCloseButton: false,
  },
};
