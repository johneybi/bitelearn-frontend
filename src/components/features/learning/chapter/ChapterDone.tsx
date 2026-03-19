import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ChapterDoneProps = {
  correct: number;
  total: number;
  accuracyRate: number;
  chapterTitle: string;
  onFinish: () => void;
};

export default function ChapterDone({
  correct,
  total,
  accuracyRate,
  chapterTitle,
  onFinish,
}: ChapterDoneProps) {
  return (
    <main className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white text-slate-900">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex w-full flex-col items-center text-center"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900">
            <Check size={32} className="text-white" strokeWidth={3} />
          </div>

          <h1 className="mb-1 text-2xl font-bold text-slate-900">챕터 완료!</h1>

          <p className="mb-10 max-w-[260px] text-sm leading-snug text-slate-400">
            {chapterTitle}
          </p>

          <div className="mb-4 w-full rounded-3xl border-2 border-slate-100 bg-slate-50 p-6">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              퀴즈 결과
            </p>

            <div className="mb-3 flex items-end justify-between">
              <span className="text-4xl font-black leading-none text-slate-900">
                {accuracyRate}%
              </span>
              <span className="mb-0.5 text-sm text-slate-400">
                {correct} / {total} 정답
              </span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-slate-900"
                initial={{ width: 0 }}
                animate={{ width: `${accuracyRate}%` }}
                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </div>

          <Button
            className="h-14 w-full rounded-2xl text-base font-bold"
            onClick={onFinish}
          >
            결과 확인
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
