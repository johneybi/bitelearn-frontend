import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ChapterPlayer from '@/components/features/learning/chapter/ChapterPlayer';
import {
  completeLearningVocab,
  getLearningChapter,
  getLearningChapterResult,
  submitLearningQuiz,
} from '@/api/learning/learning.api';
import AppLoading from '@/components/common/AppLoading';
import { getCategoryMetaByRouteId } from '@/constants/learningNavigation';
import { logError } from '@/lib/logError';
import type { ChapterLearningResponse } from '@/api/learning/learning.types';

const LEARNING_CHAPTER_ERROR_MESSAGE =
  '학습 데이터를 불러오지 못했습니다. 다시 시도해 주세요.';

export default function LearningChapterPage() {
  const navigate = useNavigate();
  const { categoryId, chapterId } = useParams();
  const category = getCategoryMetaByRouteId(categoryId);
  const chapterIdNumber = Number(chapterId);
  const [chapterData, setChapterData] =
    useState<ChapterLearningResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);

  useEffect(() => {
    if (!category || !categoryId || !chapterId || Number.isNaN(chapterIdNumber)) {
      return;
    }

    let isMounted = true;

    const fetchChapter = async () => {
      try {
        const response = await getLearningChapter(chapterIdNumber);
        if (!isMounted) return;
        setChapterData(response);
        setLoadError(null);
      } catch (error) {
        if (!isMounted) return;
        logError('LearningChapterPage', '학습 데이터 조회 실패', error);
        setLoadError(error);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    void fetchChapter();

    return () => {
      isMounted = false;
    };
  }, [category, categoryId, chapterId, chapterIdNumber]);

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
    return <AppLoading message="학습 데이터를 불러오는 중입니다." />;
  }

  if (loadError || !chapterData) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-red-400">
          {loadError instanceof Error
            ? loadError.message
            : LEARNING_CHAPTER_ERROR_MESSAGE}
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
