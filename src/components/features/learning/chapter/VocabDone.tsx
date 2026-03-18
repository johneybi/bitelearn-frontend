import { motion } from 'framer-motion';
import { BookCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

type VocabDoneProps = {
  chapterTitle: string;
  vocabCount: number;
  onStartQuiz: () => void;
};

export default function VocabDone({
  chapterTitle,
  vocabCount,
  onStartQuiz,
}: VocabDoneProps) {
  return (
    <main className="flex h-full min-h-0 flex-col bg-white text-slate-900">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-[320px]"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900">
            <BookCheck size={30} className="text-white" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            단어 학습 완료
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-400">{chapterTitle}</p>

          <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
            <p className="text-xs font-bold text-slate-400">완료한 단어</p>
            <p className="mt-1 text-lg font-extrabold text-slate-900">
              {vocabCount}개
            </p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            핵심 개념을 확인했어요. 이제 퀴즈로 실전 감각을 점검해 봅시다.
          </p>
        </motion.div>
      </div>

      <footer className="shrink-0 border-t border-slate-100 bg-white px-6 pb-8 pt-4">
        <Button
          className="h-14 w-full rounded-2xl text-base font-bold"
          onClick={onStartQuiz}
        >
          퀴즈 시작하기
        </Button>
      </footer>
    </main>
  );
}

