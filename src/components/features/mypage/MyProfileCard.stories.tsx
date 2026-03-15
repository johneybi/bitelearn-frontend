import type { Meta, StoryObj } from '@storybook/react-vite';

import MyProfileCard from './MyProfileCard';

const meta = {
  title: 'MyPage/MyProfileCard',
  component: MyProfileCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    nickname: 'BiteLearn',
    email: 'bitelearn@bitelearn.com',
    onClick: () => {},
  },
} satisfies Meta<typeof MyProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <MyProfileCard {...args} />
    </div>
  ),
};
