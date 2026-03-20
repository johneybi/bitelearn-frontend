import { useMemo, useState } from 'react';
import type { QuizInfo } from '@/api/learning/learning.types';
import type { QuizPhase } from '@/components/features/learning/quiz/quiz.types';
import QuizPassagePhase from '@/components/features/learning/quiz/phases/QuizPassagePhase';
import QuizChoicesPhase from '@/components/features/learning/quiz/phases/QuizChoicesPhase';
import QuizResultPhase from '@/components/features/learning/quiz/phases/QuizResultPhase';

type IncorrectNoteQuizViewerProps = {
  quiz: QuizInfo;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  onClose: () => void;
};

function findSelectedChoiceIndex(userAnswer: string, options: string[]) {
  return options.findIndex((option) => option.trim() === userAnswer.trim());
}

function findSelectedDocumentIndex(
  userAnswer: string,
  documentElements: { key: string; value: string }[]
) {
  return documentElements.findIndex(
    (element) =>
      element.key.trim() === userAnswer.trim() ||
      element.value.trim() === userAnswer.trim()
  );
}

function resolveInitialSelectedChoice(quiz: QuizInfo, userAnswer: string) {
  if (quiz.type === 'DOC_CLICK' || quiz.type === 'DOC_MCQ') {
    const documentIndex = findSelectedDocumentIndex(
      userAnswer,
      quiz.specificData?.documentElements ?? []
    );

    return documentIndex === -1 ? '' : String(documentIndex);
  }

  const selectedIndex = findSelectedChoiceIndex(
    userAnswer,
    quiz.specificData?.options ?? []
  );

  return selectedIndex === -1 ? '' : String(selectedIndex);
}

export default function IncorrectNoteQuizViewer({
  quiz,
  userAnswer,
  correctAnswer,
  explanation,
  onClose,
}: IncorrectNoteQuizViewerProps) {
  const [phase, setPhase] = useState<QuizPhase>('passage');
  const [selectedChoice, setSelectedChoice] = useState(() =>
    resolveInitialSelectedChoice(quiz, userAnswer)
  );

  const isCorrect = userAnswer.trim() === correctAnswer.trim();
  const correctAnswerIndex = useMemo(() => {
    if (quiz.type === 'DOC_CLICK') {
      return (quiz.specificData?.documentElements ?? []).findIndex(
        (element) => element.key.trim() === correctAnswer.trim()
      );
    }

    return (quiz.specificData?.options ?? []).findIndex(
      (choice) => choice.trim() === correctAnswer.trim()
    );
  }, [correctAnswer, quiz]);

  const handleSolve = () => {
    setPhase('choices');
  };

  const handleGoPassage = () => {
    setPhase('passage');
  };

  const handleCheckAnswer = () => {
    setPhase('result');
  };

  return (
    <>
      {phase === 'passage' && (
        <QuizPassagePhase
          question={quiz}
          currentIndex={0}
          skipConversationAnimation
          onSolve={handleSolve}
        />
      )}

      {phase === 'choices' && (
        <QuizChoicesPhase
          question={quiz}
          currentIndex={0}
          correctIndex={correctAnswerIndex}
          selectedChoice={selectedChoice}
          isChecking
          onSelectChoice={setSelectedChoice}
          onCheckAnswer={handleCheckAnswer}
          onCheckAnswerWithIndex={(selectedIndex) => {
            setSelectedChoice(String(selectedIndex));
            setPhase('result');
          }}
          onPrevious={handleGoPassage}
          ctaLabel="결과 보기"
          allowSubmitWhenChecking
        />
      )}

      {phase === 'result' && (
        <QuizResultPhase
          question={quiz}
          selectedChoice={selectedChoice}
          isCorrect={isCorrect}
          overrideResult={{
            correct: isCorrect,
            explanation,
            correctAnswer,
            correctAnswerIndex,
          }}
          isLastQuestion
          onNext={onClose}
          nextLabel="오답노트로 돌아가기"
        />
      )}
    </>
  );
}
