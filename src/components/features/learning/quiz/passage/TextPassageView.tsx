import QuizFooter from '@/components/common/QuizFooter';
import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import type { QuizInfo } from '@/api/learning/learning.types';
import type { StepIndicatorInfo } from '../quiz.types';
import QuizTitle from '../shared/QuizTitle';
import TextPassageCard from './TextPassageCard';

type Props = {
  question: QuizInfo;
  indicatorSteps: StepIndicatorInfo[];
  onSolve: () => void;
};

export default function TextPassageView({
  question,
  indicatorSteps,
  onSolve,
}: Props) {
  const passageTitle = question.passageTitle ?? '';
  const passageContent = question.passageContent ?? '';
  const imageSrc = question.questionImageUrl ?? undefined;

  return (
    <>
      <section className="flex-1 overflow-y-auto bg-background px-5 pt-[74px]">
        <div className="flex min-h-full w-full flex-col justify-center">
          <div className="flex flex-col gap-3">
            {passageTitle && (
              <QuizTitle
                questionNumber={question.sequence}
                questionTitle={passageTitle}
              />
            )}

            <TextPassageCard
              content={passageContent}
              imageAlt={question.questionTitle}
              imageSrc={imageSrc}
            />
          </div>
        </div>
      </section>

      <ChapterIndicator steps={indicatorSteps} variant="quiz" />
      <QuizFooter onClick={onSolve} showTrailingIcon={false}>
        퀴즈 풀기
      </QuizFooter>
    </>
  );
}
