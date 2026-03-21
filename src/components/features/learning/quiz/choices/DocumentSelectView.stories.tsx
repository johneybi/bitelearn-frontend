import type { Meta, StoryObj } from '@storybook/react-vite';
import type { QuizInfo } from '@/api/learning/learning.types';
import DocumentSelectView from './DocumentSelectView';
const documentSelectQuestion: QuizInfo = {
  quizId: 4,
  sequence: 4,
  type: 'DOC_CLICK',
  passageTitle: '계약서 항목 확인',
  passageContent: '아래 항목 중 보증금 보호와 가장 직접적으로 연결되는 항목을 고르세요.',
  questionImageUrl: '',
  questionTitle: '가장 중요한 항목은?',
  specificData: {
    documentTitle: '임대차계약서',
    documentSubtitle: '보증금 보호 확인용 예시 문서',
    options: ['소유자', '보증보험 특약', '도배 상태', '입주 가능일'],
    dialogues: [],
    documentElements: [
      { key: '소유자', value: '불독' },
      { key: '특약', value: '보증보험 가입 불가 시 계약 무효' },
      { key: '도배', value: '세입자 부담' },
      { key: '입주일', value: '2026-03-20' },
    ],
  },
};

const baseArgs = {
  question: documentSelectQuestion,
  questionNumber: 4,
  questionTitle: documentSelectQuestion.questionTitle,
  selectedValue: '',
  onSelectChoice: () => {},
  onCheckAnswer: () => {},
  isChecking: false,
  onPrevious: () => {},
};

const meta = {
  title: 'Learning/Quiz/Choices/DocumentSelectView',
  component: DocumentSelectView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocumentSelectView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IdleUnselected: Story = {
  args: { ...baseArgs },
};

export const FieldSelected: Story = {
  args: {
    ...baseArgs,
    selectedValue: '1',
    isChecking: false,
  },
};
