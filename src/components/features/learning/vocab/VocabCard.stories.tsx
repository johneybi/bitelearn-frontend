import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { VocabInfo } from '@/api/learning/learning.types';

import VocabCard from './VocabCard';

const sampleVocab: VocabInfo = {
  id: 1,
  frontMain: '확정일자',
  frontSub: '보증금 보호 장치',
  frontImageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=400&q=80',
  backMain: '전입신고와 함께 보증금 보호 순위를 확보하는 절차',
  backSub: '이사 당일에 함께 처리해야 안전합니다.',
};

const meta = {
  title: 'Learning/Vocab/VocabCard',
  component: VocabCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    vocab: sampleVocab,
    isFlipped: false,
    onFlip: () => {},
  },
} satisfies Meta<typeof VocabCard>;

export default meta;
type Story = StoryObj<typeof meta>;
type VocabCardProps = ComponentProps<typeof VocabCard>;

function renderCard(args: VocabCardProps) {
  return (
    <div className="mx-auto h-[480px] w-full max-w-[320px]">
      <VocabCard {...args} />
    </div>
  );
}

export const Front: Story = {
  render: (args) => renderCard(args),
};

export const Back: Story = {
  render: (args) => renderCard(args),
  args: {
    isFlipped: true,
  },
};
