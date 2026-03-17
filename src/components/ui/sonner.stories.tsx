import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from 'next-themes';
import { toast } from 'sonner';
import { Toaster } from './sonner';

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" forcedTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

type ToastVariant = 'default' | 'info' | 'success' | 'error' | 'warning';

function VisibleToastStory({ variant }: { variant: ToastVariant }) {
  useEffect(() => {
    toast.dismiss();

    const options = { duration: 60_000 };

    if (variant === 'success') {
      toast.success('성공했어요', options);
    } else if (variant === 'error') {
      toast.error('실패했어요', options);
    } else if (variant === 'warning') {
      toast.warning('주의가 필요해요', options);
    } else if (variant === 'info') {
      toast.info('안내할게요', options);
    } else {
      toast('기본 메시지예요', options);
    }

    return () => {
      toast.dismiss();
    };
  }, [variant]);

  return (
    <div className="min-h-[220px] bg-slate-50 p-6">
      <Toaster position="top-center" />
    </div>
  );
}

export const Default: Story = {
  render: () => <VisibleToastStory variant="default" />,
};

export const Info: Story = {
  render: () => <VisibleToastStory variant="info" />,
};

export const Success: Story = {
  render: () => <VisibleToastStory variant="success" />,
};

export const Error: Story = {
  render: () => <VisibleToastStory variant="error" />,
};

export const Warning: Story = {
  render: () => <VisibleToastStory variant="warning" />,
};
