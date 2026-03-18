import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';

import ChoiceResultView from '../result/ChoiceResultView';
import DocumentResultView from '../result/DocumentResultView';

type Props = {
  question: ChoiceQuestionItem;
  selectedChoice: string;
  isCorrect: boolean;
  overrideResult?: {
    explanation: string;
    correctAnswer: string;
  };
  isLastQuestion: boolean;
  onNext: () => void;
};

export default function QuizResultPhase({
  question,
  selectedChoice,
  isCorrect,
  overrideResult,
  isLastQuestion,
  onNext,
}: Props) {
  const selectedIndex = selectedChoice !== '' ? Number(selectedChoice) : -1;
  const resolvedExplanation = overrideResult?.explanation ?? question.explanation;
  const resolvedCorrectAnswer =
    overrideResult?.correctAnswer ??
    (question.choices[question.correctIndex] ?? '');
  const resolvedCorrectIndex = question.choices.findIndex(
    (choice) => choice === resolvedCorrectAnswer
  );

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
        explanation={resolvedExplanation}
        documentCard={question.documentCard}
        correctIndex={resolvedCorrectIndex >= 0 ? resolvedCorrectIndex : question.correctIndex}
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
      correctAnswerText={resolvedCorrectAnswer}
      selectedAnswerText={
        selectedIndex !== -1 ? (question.choices[selectedIndex] ?? '') : ''
      }
      explanation={resolvedExplanation}
      characterImageUrl={characterImageUrl}
      isLastQuestion={isLastQuestion}
      onNext={onNext}
    />
  );
}
