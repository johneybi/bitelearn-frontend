import type { Meta, StoryObj } from '@storybook/react-vite';

import { getRoadmapLayoutHeight } from './roadmap.utils';
import RoadmapCurve from './RoadmapCurve';

const meta = {
  title: 'Learning/Roadmap/RoadmapCurve',
  component: RoadmapCurve,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    count: 6,
    totalHeight: getRoadmapLayoutHeight(6),
  },
} satisfies Meta<typeof RoadmapCurve>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="relative mx-auto w-[140px]" style={{ height: args.totalHeight }}>
      <RoadmapCurve {...args} />
    </div>
  ),
};
