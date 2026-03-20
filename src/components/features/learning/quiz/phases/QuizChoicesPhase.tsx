import type { QuizInfo } from '@/api/learning/learning.types';

import MultipleChoiceView from '../choices/MultipleChoiceView';
import DocumentSelectView from '../choices/DocumentSelectView';
import OXChoiceView from '../choices/OXChoiceView';

type Props = {
  question: QuizInfo;
  currentIndex: number;
  correctIndex?: number;
  selectedChoice: string;
  isChecking: boolean;
  onSelectChoice: (value: string) => void;
  onCheckAnswer: () => void;
  onCheckAnswerWithIndex: (selectedIndex: number) => void;
  onPrevious?: () => void;
  ctaLabel?: string;
  allowSubmitWhenChecking?: boolean;
};

export default function QuizChoicesPhase({
  question,
  currentIndex,
  correctIndex,
  selectedChoice,
  isChecking,
  onSelectChoice,
  onCheckAnswer,
  onCheckAnswerWithIndex,
  onPrevious,
  ctaLabel,
  allowSubmitWhenChecking = false,
}: Props) {
  const questionNumber = question.sequence ?? currentIndex + 1;
  const hasDocumentElements = Boolean(
    question.specificData?.documentElements?.length
  );
  const choiceMode =
    question.type === 'DIALOGUE_OX'
      ? 'ox'
      : question.type === 'DOC_CLICK' && hasDocumentElements
        ? 'document_select'
        : 'multiple';
  const choices = question.specificData?.options ?? [];

  if (choiceMode === 'document_select') {
    return (
      <DocumentSelectView
        question={question}
        questionNumber={questionNumber}
        questionTitle={question.questionTitle}
        correctIndex={correctIndex}
        selectedValue={selectedChoice}
        isChecking={isChecking}
        onSelectChoice={onSelectChoice}
        onCheckAnswer={onCheckAnswer}
        onPrevious={onPrevious}
        ctaLabel={ctaLabel}
        allowSubmitWhenChecking={allowSubmitWhenChecking}
      />
    );
  }

  if (choiceMode === 'ox') {
    return (
      <OXChoiceView
        key={questionNumber}
        questionNumber={questionNumber}
        questionTitle={question.questionTitle}
        correctIndex={correctIndex}
        selectedValue={selectedChoice}
        onSelectChoice={onSelectChoice}
        onCheckAnswer={onCheckAnswerWithIndex}
        isChecking={isChecking}
        onPrevious={onPrevious}
        ctaLabel={ctaLabel}
        allowSubmitWhenChecking={allowSubmitWhenChecking}
      />
    );
  }

  return (
    <MultipleChoiceView
      questionNumber={questionNumber}
      questionTitle={question.questionTitle}
      choices={choices}
      selectedValue={selectedChoice}
      onSelectChoice={onSelectChoice}
      onCheckAnswer={onCheckAnswerWithIndex}
      isChecking={isChecking}
      correctIndex={correctIndex}
      onPrevious={onPrevious}
      ctaLabel={ctaLabel}
      allowSubmitWhenChecking={allowSubmitWhenChecking}
    />
  );
}
