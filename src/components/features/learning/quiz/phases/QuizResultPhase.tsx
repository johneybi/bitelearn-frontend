import type { QuizInfo } from '@/api/learning/learning.types';
import {
  getQuizChoiceMode,
  getQuizChoices,
  getQuizPassageMode,
  toDocumentCardData,
} from '../learningQuiz.utils';

import ChoiceResultView from '../result/ChoiceResultView';
import DocumentResultView from '../result/DocumentResultView';

type Props = {
  question: QuizInfo;
  selectedChoice: string;
  isCorrect: boolean;
  overrideResult?: {
    correct: boolean;
    explanation: string;
    correctAnswer: string;
    correctAnswerIndex: number;
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
  const choices = getQuizChoices(question);
  const selectedIndex = selectedChoice !== '' ? Number(selectedChoice) : -1;
  const resolvedExplanation = overrideResult?.explanation ?? '';
  const resolvedCorrectAnswer =
    overrideResult?.correctAnswer ?? '';
  const resolvedCorrectIndex = overrideResult?.correctAnswerIndex ?? -1;
  const documentCard = toDocumentCardData(question);

  const characterImageUrl = isCorrect
    ? '/images/character/dog_perfect.png'
    : '/images/character/dog_fail.png';

  const isDocumentResult =
    getQuizPassageMode(question) === 'document' ||
    getQuizChoiceMode(question) === 'document_select';

  if (isDocumentResult && documentCard) {
    return (
      <DocumentResultView
        isCorrect={isCorrect}
        explanation={resolvedExplanation}
        documentCard={documentCard}
        correctIndex={resolvedCorrectIndex}
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
      selectedAnswerText={selectedIndex !== -1 ? (choices[selectedIndex] ?? '') : ''}
      explanation={resolvedExplanation}
      characterImageUrl={characterImageUrl}
      isLastQuestion={isLastQuestion}
      onNext={onNext}
    />
  );
}
