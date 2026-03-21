import type { Meta, StoryObj } from '@storybook/react-vite';
import DocumentCard from './DocumentCard';

const documentCardData = {
  header: '등 기 사 항 전 부 증 명 서',
  subHeader: '토지 및 건물 — 가상 문서',
  fields: [
    { label: '소재지', value: '햇살동 100번지 뼈다귀 하우스' },
    { label: '소유자', value: '불독 (800101-*******)' },
    { label: '순위번호', value: '2번' },
    { label: '등기목적', value: '가압류' },
    {
      label: '권리자 및 기타',
      value: '채권자 개굴개굴은행\n청구금액 50,000,000원',
    },
  ],
};

const correctIndex = 3;

const interactiveArgs = {
  data: documentCardData,
  mode: 'interactive' as const,
  choiceMode: 'document_select' as const,
  selectedValue: '',
  onSelectField: () => {},
  isChecking: false,
  correctIndex,
};

const resultArgs = {
  data: documentCardData,
  mode: 'result' as const,
  correctIndex,
  selectedAnswerIndex: 0,
};

const meta = {
  title: 'Learning/Quiz/Shared/DocumentCard',
  component: DocumentCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DocumentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InteractiveIdle: Story = {
  args: { ...interactiveArgs },
};

export const FieldSelected: Story = {
  args: {
    ...interactiveArgs,
    selectedValue: String(correctIndex),
    isChecking: false,
  },
};

export const ResultAnswerRevealed: Story = {
  args: { ...resultArgs },
};
