import QuizFooter from '@/components/common/QuizFooter';
import DocumentCard from '../shared/DocumentCard';
import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';
import QuizTitle from '../shared/QuizTitle';

type DocumentSelectViewProps = {
  question: ChoiceQuestionItem;
  currentIndex: number;
  selectedValue: string;
  onSelectChoice: (value: string) => void;
  onCheckAnswer: (selectedIndex?: number) => void;
  isChecking?: boolean;
  onPrevious?: () => void;
};

export default function DocumentSelectView({
  question,
  currentIndex,
  selectedValue,
  isChecking,
  onSelectChoice,
  onCheckAnswer,
  onPrevious,
}: DocumentSelectViewProps) {
  if (!question.documentCard) return null;

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6">
        <QuizTitle
          questionNumber={question.questionNumber ?? currentIndex + 1}
          question={question.question}
        />

        <DocumentCard
          data={question.documentCard}
          mode="interactive"
          choiceMode="document_select"
          selectedValue={selectedValue}
          onSelectField={onSelectChoice}
          isChecking={isChecking}
          correctIndex={question.correctIndex}
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
