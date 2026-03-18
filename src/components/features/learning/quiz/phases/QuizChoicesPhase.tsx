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
}: Props) {
  const choiceMode =
    question.type === 'DIALOGUE_OX'
      ? 'ox'
      : question.type === 'DOC_SELECT'
        ? 'document_select'
        : 'multiple';
  const choices = question.specificData?.options ?? [];

  if (choiceMode === 'document_select') {
    return (
      <DocumentSelectView
        question={question}
        currentIndex={currentIndex}
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
        key={question.sequence ?? currentIndex}
        questionNumber={question.sequence ?? currentIndex + 1}
        questionTitle={question.questionTitle}
        correctIndex={correctIndex}
        onCheckAnswer={onCheckAnswerWithIndex}
        isChecking={isChecking}
        onPrevious={onPrevious}
      />
    );
  }

  return (
    <MultipleChoiceView
      questionNumber={question.sequence ?? currentIndex + 1}
      questionTitle={question.questionTitle}
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
