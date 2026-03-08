import { useNavigate } from 'react-router-dom';

import QuizPlayer from '@/components/features/quiz/QuizPlayer';
import { MOCK_CHOICE_QUESTION_SET } from '@/mock/choiceQuestion';

export default function QuizPage() {
  const navigate = useNavigate();

  const quizQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter(
    (question) => question.type === 'quiz'
  );

  return (
    <QuizPlayer
      questions={quizQuestions}
      headerTitle={MOCK_CHOICE_QUESTION_SET.title}
      onBack={() => navigate(-1)}
    />
  );
}
