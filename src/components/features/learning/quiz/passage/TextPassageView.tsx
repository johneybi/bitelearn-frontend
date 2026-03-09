import QuizFooter from '@/components/common/QuizFooter';
import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';
import QuizPassage from '../shared/QuizPassage';

type Props = {
  question: ChoiceQuestionItem;
  onSolve: () => void;
};

export default function TextPassageView({ question, onSolve }: Props) {
  return (
    <>
      <section className="flex-1 overflow-y-auto px-6 py-4">
        <QuizPassage
          passage={question.passage}
          flavorText={question.flavorText}
        />
      </section>

      <QuizFooter onClick={onSolve}>문제 풀기</QuizFooter>
    </>
  );
}
