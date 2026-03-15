import type { Meta, StoryObj } from '@storybook/react-vite';

import type { MenuItem } from './mypage.types';

import MyPageMenuSection from './MyPageMenuSection';

const menuItems: MenuItem[] = [
  {
    label: '서비스 약관',
    details: [
      { text: '이용 약관' },
      { text: '개인정보 처리방침' },
      { text: '마케팅 수신 동의' },
    ],
  },
  {
    label: '고객센터',
    details: [{ text: '자주 묻는 질문' }, { text: '1:1 문의' }, { text: '공지사항' }],
  },
];

const meta = {
  title: 'MyPage/MyPageMenuSection',
  component: MyPageMenuSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items: menuItems,
  },
} satisfies Meta<typeof MyPageMenuSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="px-5">
      <MyPageMenuSection {...args} />
    </div>
  ),
};
