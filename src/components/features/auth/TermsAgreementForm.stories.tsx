import type { Meta, StoryObj } from '@storybook/react-vite';

import TermsAgreementForm from './TermsAgreementForm';

const meta = {
  title: 'Auth/TermsAgreementForm',
  component: TermsAgreementForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onNext: () => {},
    onOpenServiceTerms: () => {},
    onOpenPrivacyTerms: () => {},
  },
} satisfies Meta<typeof TermsAgreementForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-sm bg-background">
      <TermsAgreementForm {...args} />
    </div>
  ),
};
