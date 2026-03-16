import type { Meta, StoryObj } from '@storybook/react-vite';

import AccountProfileSection from './AccountProfileSection';

const meta = {
  title: 'MyPage/AccountProfileSection',
  component: AccountProfileSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nickname: 'BiteLearn',
    isEditing: false,
    onEdit: () => {},
    onChange: () => {},
    onSubmit: () => {},
  },
} satisfies Meta<typeof AccountProfileSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <AccountProfileSection {...args} />,
};

export const Editing: Story = {
  render: (args) => <AccountProfileSection {...args} />,
  args: {
    isEditing: true,
  },
};
