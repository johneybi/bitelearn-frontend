import type { Meta, StoryObj } from '@storybook/react-vite';
import type { QuizInfo } from '@/api/learning/learning.types';
import DocumentPassageView from './DocumentPassageView';
const documentPassageQuestion: QuizInfo = {
  quizId: 3,
  sequence: 3,
  type: 'DOC_MULTI',
  passageTitle: '등기사항전부증명서',
  passageContent: '다음 문서 항목을 보고 위험 신호를 찾아보세요.',
  questionImageUrl: '',
  questionTitle: '문서에서 가장 위험한 항목은?',
  specificData: {
    options: ['소유자', '가압류', '소재지', '접수일자'],
    dialogues: [],
    documentElements: [
      { key: '소재지', value: '햇살동 100번지' },
      { key: '소유자', value: '불독' },
      { key: '등기목적', value: '가압류' },
      { key: '권리자', value: '개굴개굴은행' },
    ],
  },
};

const meta = {
  title: 'Learning/Quiz/Passage/DocumentPassageView',
  component: DocumentPassageView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocumentPassageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocumentCardVisible: Story = {
  args: {
    question: documentPassageQuestion,
    onSolve: () => {},
  },
};
