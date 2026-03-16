import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button type="button">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>프로필을 수정할까요?</DialogTitle>
            <DialogDescription>
              변경한 내용은 저장 후 바로 반영됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 text-sm text-slate-600">
            다이얼로그 내부 콘텐츠 예시입니다.
          </div>
          <DialogFooter>
            <Button type="button" variant="outline">
              취소
            </Button>
            <Button type="button">저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
