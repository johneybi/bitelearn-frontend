import QuizFooter from '@/components/common/QuizFooter';
import type { QuizInfo } from '@/api/learning/learning.types';
import DocumentCard from '../shared/DocumentCard';
import { toDocumentCardData } from '../learningQuiz.utils';
import QuizPassage from '../shared/QuizPassage';

type DocumentPassageViewProps = {
  question: QuizInfo;
  onSolve: () => void;
};

export default function DocumentPassageView({
  question,
  onSolve,
}: DocumentPassageViewProps) {
  const documentCard = toDocumentCardData(question);

  if (!documentCard) return null;

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6 py-4">
        <QuizPassage
          questionTitle={question.questionTitle}
          questionNumber={question.sequence}
          passageContent={question.passageContent ?? ''}
          passageTitle={question.passageTitle ?? ''}
        >
          <DocumentCard
            data={documentCard}
            mode="interactive"
            choiceMode="multiple"
          />
        </QuizPassage>
      </section>

      <QuizFooter onClick={onSolve}>문제 풀기</QuizFooter>
    </>
  );
}
