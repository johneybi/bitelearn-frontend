import { useMemo, useState } from 'react';

import QuizPlayer from '@/components/features/learning/quiz/QuizPlayer';
import ChapterDone from './ChapterDone';
import ChapterResult from './ChapterResult';
import ChapterIntro from './ChapterIntro';
import VocabDone from './VocabDone';

import type { ChoiceQuestionSet } from '@/mock/choiceQuestion';
import type {
  QuizMetric,
  StepIndicatorInfo,
} from '@/components/features/learning/quiz/quiz.types';
import VocabCardsPlayer from '../vocab/VocabCardsPlayer';
import type {
  GetLearningChapterResultResponse,
  LearningProgressStatus,
  SubmitLearningQuizResponse,
} from '@/api/learning/learning.types';

type ChapterPhase =
  | 'intro'
  | 'vocabs'
  | 'vocab_done'
  | 'quiz'
  | 'done'
  | 'final';

type ChapterIntroData = {
  title: string;
  prologueSubtitle: string;
  goal: string;
  description: string;
  coreKeywords: string[];
};

type ChapterPlayerProps = {
  questionSet: ChoiceQuestionSet;
  chapterIntro: ChapterIntroData;
  initialStatus?: LearningProgressStatus;
  initialQuizSequence?: number | null;
  onVocabComplete?: () => Promise<void>;
  onSubmitQuiz?: (
    quizId: number,
    selectedAnswer: string
  ) => Promise<SubmitLearningQuizResponse>;
  onFetchResult?: () => Promise<GetLearningChapterResultResponse>;
  onComplete: (total: number, correct: number) => void;
  onBack: () => void;
};

export default function ChapterPlayer({
  questionSet,
  chapterIntro,
  initialStatus = 'READY',
  initialQuizSequence = null,
  onVocabComplete,
  onSubmitQuiz,
  onFetchResult,
  onComplete,
  onBack,
}: ChapterPlayerProps) {
  const vocabQuestions = useMemo(
    () => questionSet.questions.filter((q) => q.type === 'vocab'),
    [questionSet]
  );

  const quizQuestions = useMemo(
    () => questionSet.questions.filter((q) => q.type === 'quiz'),
    [questionSet]
  );

  const initialPhase: ChapterPhase = 'intro';

  const [chapterPhase, setChapterPhase] = useState<ChapterPhase>(initialPhase);
  const [quizResult, setQuizResult] = useState<{
    total: number;
    correct: number;
  } | null>(null);

  const [vocabIdx, setVocabIdx] = useState(0);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(
    initialQuizSequence && initialQuizSequence > 0 ? initialQuizSequence - 1 : 0
  );
  const [quizMetrics, setQuizMetrics] = useState<QuizMetric[]>(
    Array(quizQuestions.length).fill('none')
  );

  const combinedSteps: StepIndicatorInfo[] = useMemo(() => {
    const vocabSteps: StepIndicatorInfo[] = vocabQuestions.map((_, idx) => ({
      type: 'vocab',
      status: 'none',
      isCurrent: chapterPhase === 'vocabs' && idx === vocabIdx,
    }));

    const quizSteps: StepIndicatorInfo[] = quizQuestions.map((q, idx) => ({
      type: q.type ?? 'quiz',
      status: chapterPhase === 'vocabs' ? 'none' : quizMetrics[idx],
      isCurrent: chapterPhase === 'quiz' && idx === quizCurrentIndex,
    }));

    return [...vocabSteps, ...quizSteps];
  }, [
    vocabQuestions,
    quizQuestions,
    chapterPhase,
    vocabIdx,
    quizCurrentIndex,
    quizMetrics,
  ]);

  if (chapterPhase === 'final' && quizResult) {
    return (
      <ChapterResult
        correct={quizResult.correct}
        total={quizResult.total}
        chapterTitle={questionSet.title}
        onFinish={() => onComplete(quizResult.total, quizResult.correct)}
      />
    );
  }

  if (chapterPhase === 'done' && quizResult) {
    return (
      <ChapterDone
        correct={quizResult.correct}
        total={quizResult.total}
        chapterTitle={questionSet.title}
        onFinish={() => setChapterPhase('final')}
      />
    );
  }

  if (chapterPhase === 'quiz') {
    return (
      <QuizPlayer
        questions={quizQuestions}
        onBack={onBack}
        onComplete={(total, correct) => {
          if (onFetchResult) {
            onFetchResult()
              .then((result) => {
                setQuizResult({
                  total: result.totalCount,
                  correct: result.correctCount,
                });
                setChapterPhase('done');
              })
              .catch(() => {
                setQuizResult({ total, correct });
                setChapterPhase('done');
              });
            return;
          }

          setQuizResult({ total, correct });
          setChapterPhase('done');
        }}
        indicatorSteps={combinedSteps}
        onCurrentIndexChange={setQuizCurrentIndex}
        onMetricsChange={setQuizMetrics}
        initialIndex={quizCurrentIndex}
        onSubmitAnswer={
          onSubmitQuiz
            ? async (question, selectedAnswerIndex) => {
                const quizId = question.quizId ?? question.questionNumber;
                const selectedAnswer =
                  question.choices[selectedAnswerIndex] ?? '';
                return onSubmitQuiz(quizId, selectedAnswer);
              }
            : undefined
        }
      />
    );
  }

  if (chapterPhase === 'intro') {
    return (
      <ChapterIntro
        chapterTitle={chapterIntro.title}
        prologueSubtitle={chapterIntro.prologueSubtitle}
        chapterGoal={chapterIntro.goal}
        chapterDescription={chapterIntro.description}
        coreKeywords={chapterIntro.coreKeywords}
        onBack={onBack}
        onStart={() => {
          if (initialStatus === 'QUIZ_IN_PROGRESS') {
            setChapterPhase('quiz');
            return;
          }

          if (vocabQuestions.length > 0) {
            setChapterPhase('vocabs');
            return;
          }

          setChapterPhase('quiz');
        }}
      />
    );
  }

  if (chapterPhase === 'vocab_done') {
    return (
      <VocabDone
        chapterTitle={questionSet.title}
        vocabCount={vocabQuestions.length}
        onClose={onBack}
        onStartQuiz={() => {
          if (onVocabComplete) {
            onVocabComplete()
              .catch(() => undefined)
              .finally(() => setChapterPhase('quiz'));
            return;
          }

          setChapterPhase('quiz');
        }}
      />
    );
  }

  return (
    <VocabCardsPlayer
      vocabs={vocabQuestions}
      vocabIdx={vocabIdx}
      onVocabIdxChange={setVocabIdx}
      onComplete={() => setChapterPhase('vocab_done')}
      onBack={onBack}
      indicatorSteps={combinedSteps}
    />
  );
}
