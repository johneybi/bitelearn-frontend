import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';

import ChoiceResultView from '../result/ChoiceResultView';
import DocumentResultView from '../result/DocumentResultView';

type Props = {
  question: ChoiceQuestionItem;
  selectedChoice: string;
  isCorrect: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
};

export default function QuizResultPhase({
  question,
  selectedChoice,
  isCorrect,
  isLastQuestion,
  onNext,
}: Props) {
  const selectedIndex = selectedChoice !== '' ? Number(selectedChoice) : -1;

  const characterImageUrl = isCorrect
    ? question.characterCorrectImageUrl || '/images/character/dog_perfect.png'
    : question.characterIncorrectImageUrl || '/images/character/dog_fail.png';

  const isDocumentResult =
    question.passageMode === 'document' ||
    question.choiceMode === 'document_select';

  if (isDocumentResult && question.documentCard) {
    return (
      <DocumentResultView
        isCorrect={isCorrect}
        explanation={question.explanation}
        documentCard={question.documentCard}
        correctIndex={question.correctIndex}
        selectedAnswerIndex={selectedIndex !== -1 ? selectedIndex : undefined}
        characterImageUrl={characterImageUrl}
        isLastQuestion={isLastQuestion}
        onNext={onNext}
      />
    );
  }

  return (
    <ChoiceResultView
      isCorrect={isCorrect}
      correctAnswerText={question.choices[question.correctIndex] ?? ''}
      selectedAnswerText={
        selectedIndex !== -1 ? (question.choices[selectedIndex] ?? '') : ''
      }
      explanation={question.explanation}
      characterImageUrl={characterImageUrl}
      isLastQuestion={isLastQuestion}
      onNext={onNext}
    />
  );
}
