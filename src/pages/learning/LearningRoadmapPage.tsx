import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StageNode from '@/components/features/learning/roadmap/StageNode';
import { Button } from '@/components/ui/button';
import RoadmapCurve from '@/components/features/learning/roadmap/RoadmapCurve';
import {
  getRoadmapLayoutHeight,
  getRoadmapOffset,
  STEP_Y,
} from '@/components/features/learning/roadmap/roadmap.utils';
import { getLearningChapters } from '@/api/learning/learning.api';
import type { ChapterSummaryDto } from '@/api/learning/learning.types';
import { getCategoryMetaByRouteId } from '@/constants/learningNavigation';

export default function LearningRoadmapPage() {
  const navigate = useNavigate();
  const { categoryId, topicId } = useParams();

  const category = getCategoryMetaByRouteId(categoryId);
  const selectedTopic = category?.topics.find((topic) => topic.id === topicId);
  const resolvedTopicId = selectedTopic?.id ?? category?.topics[0]?.id;
  const [chapters, setChapters] = useState<ChapterSummaryDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!category) return;

    const resolvedTopic = category.topics.find(
      (topic) => topic.id === resolvedTopicId
    );

    if (!resolvedTopic) return;

    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    getLearningChapters({
      category: category.code,
      topic: resolvedTopic.code,
    })
      .then((response) => {
        if (!isMounted) return;
        setChapters(response.chapters);
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
  }, [category, resolvedTopicId]);

  if (!category || !selectedTopic) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">
          존재하지 않는 학습 경로입니다.
        </p>
      </main>
    );
  }

  const handleBack = () => {
    navigate('/learning');
  };

  const handleSelectChapter = (chapterId: number) => {
    navigate(`/learning/${category.id}/${chapterId}`);
  };

  const count = chapters.length;
  const roadmapHeight = getRoadmapLayoutHeight(count);

  return (
    <div className="flex h-full flex-col bg-white text-slate-900">
      <div className="shrink-0 border-b border-slate-100 bg-white px-4">
        <div className="flex h-14 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9 rounded-xl text-slate-600"
          >
            <ChevronLeft size={20} />
          </Button>

          <h1 className="flex-1 text-center text-sm font-bold text-slate-900">
            {selectedTopic.name}
          </h1>

          <div className="h-9 w-9" />
        </div>
      </div>

      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-10 pt-10">
        <div
          className="relative mx-auto w-full"
          style={{ height: roadmapHeight }}
        >
          {!isLoading && !hasError && count > 0 && (
            <>
              <RoadmapCurve count={count} totalHeight={roadmapHeight} />

              {chapters.map((chapter, index) => (
                <div
                  key={chapter.chapterId}
                  className="absolute"
                  style={{
                    top: index * STEP_Y,
                    left: '50%',
                    transform: `translateX(calc(-50% + ${getRoadmapOffset(index)}px))`,
                  }}
                >
                  <StageNode
                    chapter={chapter}
                    index={index}
                    onSelect={() => handleSelectChapter(chapter.chapterId)}
                  />
                </div>
              ))}
            </>
          )}

          {isLoading && (
            <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
              챕터 목록을 불러오는 중입니다.
            </div>
          )}

          {hasError && (
            <div className="flex h-full items-center justify-center text-sm font-medium text-red-400">
              챕터 목록을 불러오지 못했습니다.
            </div>
          )}

          {!isLoading && !hasError && count === 0 && (
            <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
              준비된 챕터가 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
