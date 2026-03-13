import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';
import { Label } from './label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">이메일</Label>
      <Input id="email" placeholder="example@mail.com" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="nickname" className="after:ml-1 after:text-red-500 after:content-['*']">
        닉네임
      </Label>
      <Input id="nickname" placeholder="멋진개발자" />
    </div>
  ),
};

export const DisabledPeer: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="disabled-input">비활성 입력</Label>
      <Input id="disabled-input" disabled defaultValue="수정 불가" />
    </div>
  ),
};
