import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Common/Footer',
  component: Footer,
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

type Story = StoryObj<typeof Footer>;

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

export const SecondaryAction: Story = {
  args: {
    children: '지금 시작하기',
    buttonVariant: 'secondary',
    containerClassName: 'border-t border-slate-100 bg-white/95 pb-4 backdrop-blur-md',
  },
};
