import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check } from 'lucide-react';
import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio-group';

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  render: () => (
    <RadioGroup className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="r-a" />
        <Label htmlFor="r-a">옵션 A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="r-b" />
        <Label htmlFor="r-b">옵션 B</Label>
      </div>
    </RadioGroup>
  ),
};

export const Selected: Story = {
  render: () => (
    <RadioGroup defaultValue="b" className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="rs-a" />
        <Label htmlFor="rs-a">옵션 A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="rs-b" />
        <Label htmlFor="rs-b">옵션 B</Label>
      </div>
    </RadioGroup>
  ),
};

export const CustomIconAlwaysVisible: Story = {
  render: () => (
    <RadioGroup defaultValue="pass" className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="pass"
          id="ri-pass"
          icon={<Check className="h-3 w-3 stroke-[3]" />}
          showIconAlways
        />
        <Label htmlFor="ri-pass">정답</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="fail" id="ri-fail" />
        <Label htmlFor="ri-fail">오답</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" disabled className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="rd-a" />
        <Label htmlFor="rd-a">옵션 A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="rd-b" />
        <Label htmlFor="rd-b">옵션 B</Label>
      </div>
    </RadioGroup>
  ),
};
