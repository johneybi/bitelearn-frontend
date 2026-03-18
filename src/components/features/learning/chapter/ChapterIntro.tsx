import { BookOpen, ChevronRight, Target } from 'lucide-react';

import { Button } from '@/components/ui/button';
import QuizHeader from '@/components/common/QuizHeader';

type ChapterIntroProps = {
  chapterTitle: string;
  prologueSubtitle: string;
  chapterGoal: string;
  chapterDescription: string;
  coreKeywords: string[];
  shouldResume?: boolean;
  onStart: () => void;
  onBack: () => void;
};

export default function ChapterIntro({
  chapterTitle,
  prologueSubtitle,
  chapterGoal,
  chapterDescription,
  coreKeywords,
  shouldResume = false,
  onStart,
  onBack,
}: ChapterIntroProps) {
  return (
    <main className="flex h-full min-h-0 flex-col bg-white text-slate-900">
      <QuizHeader title="챕터 소개" showCloseButton onCloseClick={onBack} />

      <section className="hide-scrollbar flex-1 overflow-y-auto px-6 py-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
          <BookOpen size={14} />
          챕터 소개
        </div>

        <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900">
          {chapterTitle}
        </h1>

        <p className="mt-3 text-base font-bold text-slate-700">
          {prologueSubtitle}
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500">
            <Target size={14} />
            이번 챕터 목표
          </p>
          <p className="text-base font-bold leading-snug text-slate-900">
            {chapterGoal}
          </p>
        </div>

        <p className="mt-6 whitespace-pre-line break-keep text-sm leading-relaxed text-slate-600">
          {chapterDescription}
        </p>

        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-bold text-slate-400">학습 포인트</p>
          <div className="flex flex-wrap gap-2">
            {coreKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="shrink-0 border-t border-slate-100 bg-white px-6 pb-8 pt-4">
        <Button
          className="h-14 w-full rounded-2xl text-base font-bold"
          onClick={onStart}
        >
          {shouldResume ? '학습 이어하기' : '학습 시작하기'} <ChevronRight size={16} />
        </Button>
      </footer>
    </main>
  );
}
