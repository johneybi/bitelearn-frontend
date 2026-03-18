import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ChapterPlayer from '@/components/features/learning/chapter/ChapterPlayer';
import {
  completeLearningVocab,
  getLearningChapter,
  getLearningChapterResult,
  submitLearningQuiz,
} from '@/api/learning/learning.api';
import type {
  ChapterLearningResponse,
  QuizInfo,
} from '@/api/learning/learning.types';
import type { ChoiceQuestionSet } from '@/mock/choiceQuestion';

function toChoices(quiz: QuizInfo) {
  const options = quiz.specificData?.options ?? [];
  return options.map((option) =>
    typeof option === 'string' ? option : option.docText
  );
}

function mapLearningDataToQuestionSet(
  chapterId: number,
  chapterData: ChapterLearningResponse
): ChoiceQuestionSet {
  const vocabQuestions = chapterData.vocabs.map((vocab, index) => ({
    questionNumber: index + 1,
    type: 'vocab' as const,
    passageMode: 'text' as const,
    passage: vocab.backMain,
    flavorText: vocab.frontSub ?? '핵심 단어',
    imageUrl: vocab.frontImageUrl ?? '',
    imageAlt: `${vocab.frontMain} 단어 이미지`,
    question: vocab.backSub ?? vocab.backMain,
    choices: [vocab.frontMain],
    correctIndex: 0,
    explanation: vocab.backSub ?? vocab.backMain,
    quizId: chapterId * 1000 + index + 1,
  }));

  const quizQuestions = chapterData.quizzes.map((quiz, index) => {
    const choices = toChoices(quiz);
    const dialogues = quiz.specificData?.dialogues ?? [];
    const isDialogueType = quiz.type === 'DIALOGUE_MCQ' || quiz.type === 'DIALOGUE_OX';

    return {
      questionNumber: index + 1,
      type: 'quiz' as const,
      passageMode: isDialogueType ? ('conversation' as const) : ('text' as const),
      choiceMode:
        quiz.type === 'DIALOGUE_OX'
          ? ('ox' as const)
          : ('multiple' as const),
      passage: quiz.passageContent ?? '',
      flavorText: quiz.passageTitle ?? '',
      imageUrl: quiz.questionImageUrl ?? '',
      imageAlt: quiz.questionTitle,
      question: quiz.questionTitle,
      choices,
      correctIndex: 0,
      explanation: '',
      quizId: quiz.quizId,
      conversations: isDialogueType
        ? dialogues.map((line, dialogueIndex) => ({
            id: `d-${quiz.quizId}-${dialogueIndex}`,
            speakerId: line.speaker,
            message: line.message,
          }))
        : undefined,
      conversationSpeakers: isDialogueType
        ? Array.from(new Set(dialogues.map((line) => line.speaker))).map(
            (speaker, speakerIndex) => ({
              id: speaker,
              name: speaker,
              position:
                speakerIndex % 2 === 0
                  ? ('left' as const)
                  : ('right' as const),
            })
          )
        : undefined,
    };
  });

  return {
    title: chapterData.chapterTitle,
    questions: [...vocabQuestions, ...quizQuestions],
  };
}

export default function LearningChapterPage() {
  const navigate = useNavigate();
  const { categoryId, chapterId } = useParams();
  const chapterIdNumber = Number(chapterId);
  const [chapterData, setChapterData] = useState<ChapterLearningResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!chapterId || Number.isNaN(chapterIdNumber)) return;

    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    getLearningChapter(chapterIdNumber)
      .then((response) => {
        if (!isMounted) return;
        setChapterData(response);
      })
      .catch(() => {
        if (!isMounted) return;
        setHasError(true);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [chapterId, chapterIdNumber]);

  if (!categoryId || !chapterId || Number.isNaN(chapterIdNumber)) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">
          존재하지 않는 챕터입니다.
        </p>
      </main>
    );
  }

  const questionSet = useMemo(() => {
    if (!chapterData) {
      return null;
    }
    return mapLearningDataToQuestionSet(chapterIdNumber, chapterData);
  }, [chapterData, chapterIdNumber]);

  if (isLoading) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">학습 데이터를 불러오는 중입니다.</p>
      </main>
    );
  }

  if (hasError || !chapterData || !questionSet) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">
          학습 데이터를 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  return (
    <ChapterPlayer
      questionSet={questionSet}
      chapterIntro={{
        title: chapterData.chapterTitle,
        prologueSubtitle: chapterData.prologueSubtitle,
        goal: chapterData.currentGoal,
        description: chapterData.prologueContent,
        coreKeywords: chapterData.coreKeywords,
      }}
      initialStatus={chapterData.currentStatus}
      initialQuizSequence={chapterData.resumeQuizSequence}
      onVocabComplete={() => completeLearningVocab(chapterIdNumber)}
      onSubmitQuiz={(quizId, selectedAnswer) =>
        submitLearningQuiz(chapterIdNumber, quizId, { selectedAnswer })
      }
      onFetchResult={() => getLearningChapterResult(chapterIdNumber)}
      onBack={() => navigate(-1)}
      onComplete={() => navigate(-1)}
    />
  );
}
