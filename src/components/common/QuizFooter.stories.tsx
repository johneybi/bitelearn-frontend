import type { Meta, StoryObj } from '@storybook/react-vite';
import QuizFooter from './QuizFooter';

const meta: Meta<typeof QuizFooter> = {
  title: 'Common/QuizFooter',
  component: QuizFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: '전체보기',
    onClick: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof QuizFooter>;

export const NextEnabledWithoutPrevious: Story = {};

export const PreviousAndNextEnabled: Story = {
  args: {
    onPrevious: () => {},
  },
};

export const PreviousEnabledNextDisabled: Story = {
  args: {
    onPrevious: () => {},
    disabled: true,
  },
};

export const AllButtonsDisabled: Story = {
  args: {
    onPrevious: () => {},
    previousDisabled: true,
    disabled: true,
  },
};
