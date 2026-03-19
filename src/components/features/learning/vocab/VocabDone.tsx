import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import QuizHeader from '@/components/common/QuizHeader';

type VocabDoneProps = {
  chapterTitle: string;
  onClose: () => void;
  onStartQuiz: () => void;
};

export default function VocabDone({
  chapterTitle,
  onClose,
  onStartQuiz,
}: VocabDoneProps) {
  return (
    <main className="flex h-full min-h-0 flex-col bg-white text-slate-900">
      <QuizHeader title={chapterTitle} showCloseButton onCloseClick={onClose} />

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-[320px]"
        >
          <div className="mx-auto mb-6 flex items-center justify-center rounded-3xl">
            캐릭터 이미지
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            단어 학습 완료
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            방금 배운 내용을 바탕으로 실전 퀴즈를 풀며 멍멍이를 도와주세요!
          </p>
        </motion.div>
      </div>

      <footer className="shrink-0 border-t border-slate-100 bg-white px-6 pb-8 pt-4">
        <Button
          className="h-14 w-full rounded-2xl text-base font-bold"
          onClick={onStartQuiz}
        >
          퀴즈 풀러 가기
        </Button>
      </footer>
    </main>
  );
}
