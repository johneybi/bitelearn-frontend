import type { Meta, StoryObj } from '@storybook/react-vite';

import ChapterResult from './ChapterResult';

const meta = {
  title: 'Learning/Chapter/ChapterResult',
  component: ChapterResult,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    correct: 10,
    total: 10,
    chapterTitle: '[2단계: 계약] 도장 찍기 전, 멍멍이의 마지막 방어선!',
    onFinish: () => {},
    onRetryWrongAnswers: () => {},
  },
} satisfies Meta<typeof ChapterResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Perfect: Story = {};

export const Close: Story = {
  args: {
    correct: 7,
    total: 10,
  },
};

export const Fail: Story = {
  args: {
    correct: 3,
    total: 10,
  },
};
