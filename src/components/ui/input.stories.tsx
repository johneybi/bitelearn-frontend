import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    placeholder: '이메일을 입력하세요',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'hello@example.com',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '읽기 전용 값',
    disabled: true,
  },
};
