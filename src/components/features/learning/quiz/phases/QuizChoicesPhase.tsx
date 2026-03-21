import type { QuizInfo } from '@/api/learning/learning.types';
import type { StepIndicatorInfo } from '../quiz.types';

import MultipleChoiceView from '../choices/MultipleChoiceView';
import DocumentSelectView from '../choices/DocumentSelectView';
import OXChoiceView from '../choices/OXChoiceView';

type Props = {
  question: QuizInfo;
  currentIndex: number;
  indicatorSteps: StepIndicatorInfo[];
  correctIndex?: number;
  selectedChoice: string;
  isChecking: boolean;
  onSelectChoice: (value: string) => void;
  onCheckAnswer: () => void;
  onCheckAnswerWithIndex: (selectedIndex: number) => void;
  onPrevious?: () => void;
};

export default function QuizChoicesPhase({
  question,
  currentIndex,
  indicatorSteps,
  correctIndex,
  selectedChoice,
  isChecking,
  onSelectChoice,
  onCheckAnswer,
  onCheckAnswerWithIndex,
  onPrevious,
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
        indicatorSteps={indicatorSteps}
        correctIndex={correctIndex}
        selectedValue={selectedChoice}
        isChecking={isChecking}
        onSelectChoice={onSelectChoice}
        onCheckAnswer={onCheckAnswer}
        onPrevious={onPrevious}
      />
    );
  }

  if (choiceMode === 'ox') {
    return (
      <OXChoiceView
        key={questionNumber}
        questionNumber={questionNumber}
        questionTitle={question.questionTitle}
        indicatorSteps={indicatorSteps}
        correctIndex={correctIndex}
        selectedValue={selectedChoice}
        onSelectChoice={onSelectChoice}
        onCheckAnswer={onCheckAnswerWithIndex}
        isChecking={isChecking}
        onPrevious={onPrevious}
      />
    );
  }

  return (
    <MultipleChoiceView
      questionTitle={question.questionTitle}
      indicatorSteps={indicatorSteps}
      choices={choices}
      selectedValue={selectedChoice}
      onSelectChoice={onSelectChoice}
      onCheckAnswer={onCheckAnswerWithIndex}
      isChecking={isChecking}
      correctIndex={correctIndex}
      onPrevious={onPrevious}
    />
  );
}
