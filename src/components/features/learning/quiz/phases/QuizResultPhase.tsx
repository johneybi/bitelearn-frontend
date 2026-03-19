import type { QuizInfo } from '@/api/learning/learning.types';
import { toDocumentCardData } from '../learningQuiz.utils';

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
  const choices = question.specificData?.options ?? [];
  const documentElements = question.specificData?.documentElements ?? [];
  const selectedIndex = selectedChoice !== '' ? Number(selectedChoice) : -1;
  const resolvedExplanation = overrideResult?.explanation ?? '';
  const resolvedCorrectAnswer = overrideResult?.correctAnswer ?? '';
  const documentCard = toDocumentCardData(question);
  const hasDocumentElements = documentElements.length > 0;

  const characterImageUrl = isCorrect
    ? '/images/character/dog_perfect.png'
    : '/images/character/dog_fail.png';

  const isDocumentResult =
    ((question.type === 'DOC_CLICK' || question.type === 'DOC_MCQ') &&
      hasDocumentElements) ||
    question.type === 'DOC_CLICK';

  const findDocumentFieldIndex = (answerText: string) => {
    const normalizedAnswer = answerText.trim();

    if (!normalizedAnswer) return -1;

    return documentElements.findIndex(
      (element) =>
        element.key.trim() === normalizedAnswer ||
        element.value.trim() === normalizedAnswer
    );
  };

  const resolvedCorrectIndex =
    question.type === 'DOC_MCQ'
      ? findDocumentFieldIndex(resolvedCorrectAnswer)
      : overrideResult?.correctAnswerIndex ?? -1;
  const resolvedSelectedAnswerIndex =
    question.type === 'DOC_MCQ' && selectedIndex !== -1
      ? findDocumentFieldIndex(choices[selectedIndex] ?? '')
      : selectedIndex !== -1
        ? selectedIndex
        : undefined;

  if (isDocumentResult && documentCard) {
    return (
      <DocumentResultView
        isCorrect={isCorrect}
        explanation={resolvedExplanation}
        documentCard={documentCard}
        correctIndex={resolvedCorrectIndex}
        selectedAnswerIndex={resolvedSelectedAnswerIndex}
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
