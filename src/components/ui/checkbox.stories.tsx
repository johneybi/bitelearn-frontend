import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './label';
import { Checkbox } from './checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb-unchecked" />
      <Label htmlFor="cb-unchecked">약관에 동의합니다</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb-checked" defaultChecked />
      <Label htmlFor="cb-checked">약관에 동의합니다</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb-disabled" disabled />
      <Label htmlFor="cb-disabled">약관에 동의합니다</Label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb-disabled-checked" defaultChecked disabled />
      <Label htmlFor="cb-disabled-checked">약관에 동의합니다</Label>
    </div>
  ),
};
