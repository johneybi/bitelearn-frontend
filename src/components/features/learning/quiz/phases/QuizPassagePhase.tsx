import type { QuizInfo } from '@/api/learning/learning.types';

import ConversationPassageView from '../passage/ConversationPassageView';
import DocumentPassageView from '../passage/DocumentPassageView';
import TextPassageView from '../passage/TextPassageView';

type Props = {
  question: QuizInfo;
  currentIndex: number;
  skipConversationAnimation: boolean;
  onSolve: () => void;
};

export default function QuizPassagePhase({
  question,
  currentIndex,
  skipConversationAnimation,
  onSolve,
}: Props) {
  if (question.type === 'DIALOGUE_MCQ' || question.type === 'DIALOGUE_OX') {
    return (
      <ConversationPassageView
        key={question.sequence ?? currentIndex}
        question={question}
        onSolve={onSolve}
        skipAnimation={skipConversationAnimation}
      />
    );
  }

  if (
    question.type === 'DOC_MCQ' &&
    question.specificData?.documentElements?.length
  ) {
    return <DocumentPassageView question={question} onSolve={onSolve} />;
  }

  return <TextPassageView question={question} onSolve={onSolve} />;
}
