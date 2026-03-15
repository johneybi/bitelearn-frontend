import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="progress">진행도</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700"
        >
          탭 기본 상태 예시입니다.
        </TabsContent>
        <TabsContent
          value="progress"
          className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700"
        >
          진행도 관련 정보를 보여줄 수 있어요.
        </TabsContent>
        <TabsContent
          value="settings"
          className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700"
        >
          설정 탭 콘텐츠 예시입니다.
        </TabsContent>
      </Tabs>
    </div>
  ),
};
