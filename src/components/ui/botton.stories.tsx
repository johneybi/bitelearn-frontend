import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

// 메타 데이터 설정
const meta = {
  title: 'UI/Button', // 스토리북 사이드바에 표시될 이름
  component: Button,
  parameters: {
    layout: 'centered', // 컴포넌트를 화면 중앙에 정렬
  },
  tags: ['autodocs'], // 자동으로 문서(Docs) 생성
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'radio',
      options: ['default', 'sm', 'lg', 'icon'],
      description: '버튼 크기',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 스토리(케이스) 정의

// 기본 버튼 스타일
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

// destructive 스타일
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

// 아웃라인 스타일
export const Outline: Story = {
  args: {
    children: 'Cancel',
    variant: 'outline',
  },
};
