import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ChapterPlayer from '@/components/features/learning/chapter/ChapterPlayer';
import {
  completeLearningVocab,
  getLearningChapter,
  getLearningChapterResult,
  submitLearningQuiz,
} from '@/api/learning/learning.api';
import type { ChapterLearningResponse } from '@/api/learning/learning.types';
import { getCategoryMetaByRouteId } from '@/constants/learningNavigation';

export default function LearningChapterPage() {
  const navigate = useNavigate();
  const { categoryId, chapterId } = useParams();
  const category = getCategoryMetaByRouteId(categoryId);
  const chapterIdNumber = Number(chapterId);
  const [chapterData, setChapterData] =
    useState<ChapterLearningResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!category || !chapterId || Number.isNaN(chapterIdNumber)) return;

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
  }, [category, chapterId, chapterIdNumber]);

  if (!category || !categoryId || !chapterId || Number.isNaN(chapterIdNumber)) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">
          존재하지 않는 학습 경로입니다.
        </p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">
          학습 데이터를 불러오는 중입니다.
        </p>
      </main>
    );
  }

  if (hasError || !chapterData) {
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
      chapterTitle={chapterData.chapterTitle}
      vocabs={chapterData.vocabs}
      quizzes={chapterData.quizzes}
      chapterIntro={{
        prologueSubtitle: chapterData.prologueSubtitle,
        goal: chapterData.currentGoal,
        prologueContent: chapterData.prologueContent,
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
