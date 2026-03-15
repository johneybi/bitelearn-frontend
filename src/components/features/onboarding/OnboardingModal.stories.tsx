import type { Meta, StoryObj } from '@storybook/react-vite';

import { ONBOARDING_DATA } from '@/constants/onboardingData';

import OnboardingModal from './OnboardingModal';

const meta = {
  title: 'Onboarding/OnboardingModal',
  component: OnboardingModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    onClose: () => {},
    initialStep: 0,
  },
  argTypes: {
    initialStep: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof OnboardingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {
  render: (args) => (
    <div className="min-h-screen bg-slate-100">
      <OnboardingModal {...args} />
    </div>
  ),
};

export const LastStep: Story = {
  render: (args) => (
    <div className="min-h-screen bg-slate-100">
      <OnboardingModal {...args} />
    </div>
  ),
  args: {
    initialStep: ONBOARDING_DATA.length - 1,
  },
};
