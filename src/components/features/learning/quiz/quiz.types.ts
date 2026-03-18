export type QuizPhase = 'passage' | 'choices' | 'checking' | 'result';
export type QuizMetric = 'none' | 'correct' | 'incorrect';

export type StepIndicatorInfo = {
  type: 'vocab' | 'quiz';
  status: QuizMetric;
  isCurrent: boolean;
};
