import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';

import ConversationPassageView from '../passage/ConversationPassageView';
import DocumentPassageView from '../passage/DocumentPassageView';
import TextPassageView from '../passage/TextPassageView';

type Props = {
  question: ChoiceQuestionItem;
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
  if (question.passageMode === 'conversation') {
    return (
      <ConversationPassageView
        key={question.questionNumber ?? currentIndex}
        question={question}
        onSolve={onSolve}
        skipAnimation={skipConversationAnimation}
      />
    );
  }

  if (question.passageMode === 'document') {
    return <DocumentPassageView question={question} onSolve={onSolve} />;
  }

  return <TextPassageView question={question} onSolve={onSolve} />;
}
