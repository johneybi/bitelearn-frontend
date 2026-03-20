import QuizFooter from '@/components/common/QuizFooter';
import DocumentCard from '../shared/DocumentCard';
import type { QuizInfo } from '@/api/learning/learning.types';
import { toDocumentCardData } from '../learningQuiz.utils';
import QuizTitle from '../shared/QuizTitle';

type DocumentSelectViewProps = {
  question: QuizInfo;
  questionNumber: number;
  questionTitle: string;
  correctIndex?: number;
  selectedValue: string;
  onSelectChoice: (value: string) => void;
  onCheckAnswer: (selectedIndex?: number) => void;
  isChecking?: boolean;
  onPrevious?: () => void;
  ctaLabel?: string;
  allowSubmitWhenChecking?: boolean;
};

export default function DocumentSelectView({
  question,
  questionNumber,
  questionTitle,
  correctIndex,
  selectedValue,
  isChecking,
  onSelectChoice,
  onCheckAnswer,
  onPrevious,
  ctaLabel,
  allowSubmitWhenChecking = false,
}: DocumentSelectViewProps) {
  const documentCard = toDocumentCardData(question)!;

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6">
        <QuizTitle
          questionNumber={questionNumber}
          questionTitle={questionTitle}
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
        disabled={
          selectedValue === '' || (isChecking && !allowSubmitWhenChecking)
        }
        previousDisabled={isChecking && !allowSubmitWhenChecking}
        onClick={onCheckAnswer}
        onPrevious={onPrevious}
      >
        {ctaLabel ?? '정답 확인'}
      </QuizFooter>
    </>
  );
}
