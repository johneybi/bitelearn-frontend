import { Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLearningChapters } from '@/api/learning/learning.api';
import type { ChapterSummaryDto } from '@/api/learning/learning.types';
import { Button } from '@/components/ui/button';
import { LEARNING_NAVIGATION } from '@/constants/learningNavigation';
import { cn } from '@/lib/utils';

type TopicSummary = {
  topicId: string;
  topicName: string;
  chapters: ChapterSummaryDto[];
};

type CategorySummary = {
  total: number;
  completed: number;
  topics: TopicSummary[];
};

export default function LearningPage() {
  const navigate = useNavigate();
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    null
  );
  const [summaryByCategory, setSummaryByCategory] = useState<
    Record<string, CategorySummary>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    Promise.allSettled(
      LEARNING_NAVIGATION.map(async (category) => {
        const responses = await Promise.allSettled(
          category.topics.map((topic) =>
            getLearningChapters({
              category: category.code,
              topic: topic.code,
            })
          )
        );

        const topicSummaries: TopicSummary[] = category.topics.map((topic, idx) => {
          const response = responses[idx];
          const chapters =
            response?.status === 'fulfilled' &&
            Array.isArray(response.value.chapters)
              ? response.value.chapters
              : [];

          return {
            topicId: topic.id,
            topicName: topic.name,
            chapters,
          };
        });

        const mergedChapters = topicSummaries.flatMap((topic) => topic.chapters);
        const completed = mergedChapters.filter(
          (chapter) => chapter.status === 'COMPLETED'
        ).length;

        return [
          category.id,
          {
            total: mergedChapters.length,
            completed,
            topics: topicSummaries,
          } satisfies CategorySummary,
        ] as const;
      })
    )
      .then((settledEntries) => {
        if (!isMounted) return;
        const entries = settledEntries
          .filter(
            (entry): entry is PromiseFulfilledResult<readonly [string, CategorySummary]> =>
              entry.status === 'fulfilled'
          )
          .map((entry) => entry.value);
        setSummaryByCategory(Object.fromEntries(entries));
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalDomains = LEARNING_NAVIGATION.length;
  const startedDomains = useMemo(
    () =>
      LEARNING_NAVIGATION.filter((category) => {
        const summary = summaryByCategory[category.id];
        return summary ? summary.completed > 0 : false;
      }).length,
    [summaryByCategory]
  );

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="flex h-full flex-col bg-white text-slate-900">
      <header className="shrink-0 border-b border-slate-50 bg-white px-6 pb-8 pt-12">
        <div className="flex items-end justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            학습 카테고리
          </h1>

          <div className="text-right">
            <span className="text-2xl font-bold leading-none text-slate-900">
              {startedDomains}
              <span className="mx-1 text-slate-300">/</span>
              {totalDomains}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <div className="h-1 w-6 rounded-full bg-slate-900" />
          <p className="text-sm font-medium text-slate-500">
            관심 있는 분야를 골라 가볍게 시작해보세요.
          </p>
        </div>
      </header>

      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-10">
          {LEARNING_NAVIGATION.map((category) => {
            const summary = summaryByCategory[category.id];
            const completed = summary?.completed ?? 0;
            const total = summary?.total ?? 0;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
            const isExpanded = expandedCategoryId === category.id;
            const isComplete = total > 0 && completed === total;

            return (
              <article
                key={category.id}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Button
                  variant="ghost"
                  className="h-auto w-full p-0 hover:bg-transparent"
                  onClick={() => handleToggleCategory(category.id)}
                >
                  <div className="flex w-full flex-col items-start gap-5">
                    <div className="flex w-full items-start justify-between">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-3xl">
                          {category.emoji}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold leading-tight text-slate-900">
                            {category.name}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-slate-500">
                            {category.tagline}
                          </p>
                        </div>
                      </div>

                      {isComplete ? (
                        <div className="rounded-full bg-emerald-500 p-1.5 text-white">
                          <Check size={14} />
                        </div>
                      ) : (
                        <div className="text-slate-400">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <div className="mb-2 flex items-end justify-between px-1">
                        <span className="text-xs font-bold text-slate-400">
                          {completed} / {total} 챕터 완료
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {isLoading ? '-' : `${progress}%`}
                        </span>
                      </div>

                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#F2A65A] transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Button>

                {isExpanded && (
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <div className="flex flex-col gap-3">
                      {(summary?.topics ?? []).map((topic) => {
                        const topicCompleted = topic.chapters.filter(
                          (chapter) => chapter.status === 'COMPLETED'
                        ).length;
                        const topicStatusLabel =
                          topicCompleted === topic.chapters.length &&
                          topic.chapters.length > 0
                            ? '학습 완료'
                            : topic.chapters.some(
                                  (chapter) => chapter.status === 'QUIZ_IN_PROGRESS'
                                )
                              ? '학습 중'
                              : '학습 전';

                        return (
                          <Button
                            key={topic.topicId}
                            variant="ghost"
                            className="h-auto w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 hover:bg-slate-100"
                            onClick={() =>
                              navigate(
                                `/learning/${category.id}/topics/${topic.topicId}`
                              )
                            }
                          >
                            <div className="w-full">
                              <div className="mb-2 flex items-center justify-between">
                                <p className="text-base font-bold text-slate-900">
                                  {topic.topicName}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-400">
                                    {topicStatusLabel}
                                  </span>
                                  <ChevronRight size={16} className="text-slate-400" />
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                {topic.chapters.map((chapter, idx) => {
                                  const isDone = chapter.status === 'COMPLETED';
                                  const isInProgress =
                                    chapter.status === 'QUIZ_IN_PROGRESS';
                                  return (
                                    <div
                                      key={chapter.chapterId}
                                      className="flex items-center gap-1"
                                    >
                                      <div
                                        className={cn(
                                          'flex h-5 w-5 items-center justify-center rounded-full text-[10px]',
                                          isDone
                                            ? 'bg-emerald-500 text-white'
                                            : isInProgress
                                              ? 'bg-slate-300 text-white'
                                              : 'bg-slate-200 text-slate-400'
                                        )}
                                      >
                                        <Check size={12} />
                                      </div>
                                      {idx !== topic.chapters.length - 1 && (
                                        <div className="h-[2px] w-4 rounded-full bg-slate-200" />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-20 px-8 pb-32 text-center">
          <p className="text-xs font-bold leading-relaxed text-slate-300">
            새로운 학습 분야가 계속 추가될 예정이에요
          </p>
        </div>
      </section>
    </div>
  );
}
