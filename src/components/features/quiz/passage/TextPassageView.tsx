import QuizFooter from '@/components/common/QuizFooter';
import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';

type Props = {
  question: ChoiceQuestionItem;
  onSolve: () => void;
};

export default function TextPassageView({ question, onSolve }: Props) {
  return (
    <>
      <section className="flex-1 overflow-y-auto px-5 py-4">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {question.passage}
          </p>
        </div>

        {question.flavorText && (
          <div className="flex items-start gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
            <p className="text-sm font-bold leading-relaxed text-slate-900">
              {question.flavorText}
            </p>
          </div>
        )}
      </section>

      <QuizFooter onClick={onSolve}>문제 풀기</QuizFooter>
    </>
  );
}
