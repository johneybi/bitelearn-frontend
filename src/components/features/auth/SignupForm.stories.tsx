import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import SignupForm from './SignupForm';

const meta = {
  title: 'Auth/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/signup']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    onSubmit: async () => {},
  },
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm px-6 py-8">
      <SignupForm {...args} />
    </div>
  ),
};
