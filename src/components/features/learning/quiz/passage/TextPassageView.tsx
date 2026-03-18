import QuizFooter from '@/components/common/QuizFooter';
import type { QuizInfo } from '@/api/learning/learning.types';
import QuizPassage from '../shared/QuizPassage';

type Props = {
  question: QuizInfo;
  onSolve: () => void;
};

export default function TextPassageView({ question, onSolve }: Props) {
  return (
    <>
      <section className="flex-1 overflow-y-auto px-6 py-4">
        <QuizPassage
          questionTitle={question.questionTitle}
          questionNumber={question.sequence}
          passageContent={question.passageContent ?? ''}
          passageTitle={question.passageTitle ?? ''}
        />
      </section>

      <QuizFooter onClick={onSolve}>문제 풀기</QuizFooter>
    </>
  );
}
