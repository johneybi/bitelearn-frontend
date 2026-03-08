import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';

import MultipleChoiceView from '../choices/MultipleChoiceView';
import DocumentSelectView from '../choices/DocumentSelectView';
import OXChoiceView from '../choices/OXChoiceView';

type Props = {
  question: ChoiceQuestionItem;
  currentIndex: number;
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
  selectedChoice,
  isChecking,
  onSelectChoice,
  onCheckAnswer,
  onCheckAnswerWithIndex,
  onPrevious,
}: Props) {
  if (question.choiceMode === 'document_select') {
    return (
      <DocumentSelectView
        question={question}
        currentIndex={currentIndex}
        selectedValue={selectedChoice}
        isChecking={isChecking}
        onSelectChoice={onSelectChoice}
        onCheckAnswer={onCheckAnswer}
        onPrevious={onPrevious}
      />
    );
  }

  if (question.choiceMode === 'ox') {
    return (
      <OXChoiceView
        key={question.questionNumber ?? currentIndex}
        questionNumber={question.questionNumber ?? currentIndex + 1}
        question={question.question}
        correctIndex={question.correctIndex}
        onCheckAnswer={onCheckAnswerWithIndex}
        isChecking={isChecking}
        onPrevious={onPrevious}
      />
    );
  }

  return (
    <MultipleChoiceView
      questionNumber={question.questionNumber ?? currentIndex + 1}
      question={question.question}
      choices={question.choices}
      selectedValue={selectedChoice}
      onSelectChoice={onSelectChoice}
      onCheckAnswer={onCheckAnswerWithIndex}
      isChecking={isChecking}
      correctIndex={question.correctIndex}
      onPrevious={onPrevious}
    />
  );
}
