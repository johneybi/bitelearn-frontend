import QuizFooter from '@/components/common/QuizFooter';
import DocumentCard from '../shared/DocumentCard';
import type { QuizInfo } from '@/api/learning/learning.types';
import { toDocumentCardData } from '../learningQuiz.utils';
import QuizTitle from '../shared/QuizTitle';

type DocumentSelectViewProps = {
  question: QuizInfo;
  currentIndex: number;
  correctIndex?: number;
  selectedValue: string;
  onSelectChoice: (value: string) => void;
  onCheckAnswer: (selectedIndex?: number) => void;
  isChecking?: boolean;
  onPrevious?: () => void;
};

export default function DocumentSelectView({
  question,
  currentIndex,
  correctIndex,
  selectedValue,
  isChecking,
  onSelectChoice,
  onCheckAnswer,
  onPrevious,
}: DocumentSelectViewProps) {
  const documentCard = toDocumentCardData(question);

  if (!documentCard) return null;

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6">
        <QuizTitle
          questionNumber={question.sequence ?? currentIndex + 1}
          questionTitle={question.questionTitle}
        />

        <DocumentCard
          data={documentCard}
          mode="interactive"
          choiceMode="document_select"
          selectedValue={selectedValue}
          onSelectField={onSelectChoice}
          isChecking={isChecking}
          correctIndex={correctIndex}
        />
      </section>

      <QuizFooter
        disabled={selectedValue === '' || isChecking}
        previousDisabled={isChecking}
        onClick={onCheckAnswer}
        onPrevious={onPrevious}
      >
        {isChecking ? '서류 스캔 중...' : '정답 확인하기'}
      </QuizFooter>
    </>
  );
}
