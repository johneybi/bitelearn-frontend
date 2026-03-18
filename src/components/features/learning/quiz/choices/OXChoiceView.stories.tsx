import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import OXChoiceView from './OXChoiceView';

type OXChoiceViewProps = ComponentProps<typeof OXChoiceView>;

const baseArgs = {
  questionNumber: 6,
  questionTitle: '중개사의 말만 믿고 등기부등본을 확인하지 않아도 계약은 안전하다.',
  correctIndex: 1,
  onCheckAnswer: (_selectedIndex: number) => {},
  isChecking: false,
  onPrevious: () => {},
};

const meta = {
  title: 'Learning/Quiz/Choices/OXChoiceView',
  component: OXChoiceView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof OXChoiceView>;

export default meta;
type Story = StoryObj<typeof meta>;

function OXStoryHarness(args: OXChoiceViewProps) {
  const [isChecking, setIsChecking] = useState(false);

  return (
    <OXChoiceView
      {...args}
      isChecking={isChecking}
      onCheckAnswer={() => setIsChecking(true)}
    />
  );
}

export const IdleUnselected: Story = {
  args: { ...baseArgs },
  render: (args) => <OXStoryHarness {...args} />,
};

export const ChoiceSelectedReadyToSubmit: Story = {
  args: { ...baseArgs },
  render: (args) => <OXStoryHarness {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /맞다/i }));
  },
};

export const CorrectChoiceChecking: Story = {
  args: { ...baseArgs, correctIndex: 0 },
  render: (args) => <OXStoryHarness {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /맞다/i }));
    await userEvent.click(canvas.getByRole('button', { name: '정답 확인' }));
  },
};

export const IncorrectChoiceChecking: Story = {
  args: { ...baseArgs, correctIndex: 1 },
  render: (args) => <OXStoryHarness {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /맞다/i }));
    await userEvent.click(canvas.getByRole('button', { name: '정답 확인' }));
  },
};
