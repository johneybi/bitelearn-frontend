import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import LoginForm from './LoginForm';

const meta = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/login']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    onSubmit: async () => {},
    onSocialLogin: () => {},
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm px-6 py-8">
      <LoginForm {...args} />
    </div>
  ),
};
