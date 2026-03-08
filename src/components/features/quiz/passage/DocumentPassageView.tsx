import QuizFooter from '@/components/common/QuizFooter';
import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';
import DocumentCard from '../shared/DocumentCard';
import QuizPassage from './QuizPassage';

type DocumentPassageViewProps = {
  question: ChoiceQuestionItem;
  onSolve: () => void;
};

export default function DocumentPassageView({
  question,
  onSolve,
}: DocumentPassageViewProps) {
  if (!question.documentCard) return null;

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6 py-4">
        <QuizPassage
          passage={question.passage}
          flavorText={question.flavorText}
        >
          <DocumentCard
            data={question.documentCard}
            mode="interactive"
            choiceMode="multiple"
          />
        </QuizPassage>
      </section>

      <QuizFooter onClick={onSolve}>문제 풀기</QuizFooter>
    </>
  );
}
