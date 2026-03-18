import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

import QuizFooter from '@/components/common/QuizFooter';
import DocumentCard, { type DocumentCardData } from '../shared/DocumentCard';

type DocumentResultViewProps = {
  isCorrect: boolean;
  explanation: string;
  documentCard: DocumentCardData;
  correctIndex: number;
  selectedAnswerIndex?: number;
  characterImageUrl?: string;
  isLastQuestion: boolean;
  onNext: () => void;
};

export default function DocumentResultView({
  isCorrect,
  explanation,
  documentCard,
  correctIndex,
  selectedAnswerIndex,
  characterImageUrl,
  isLastQuestion,
  onNext,
}: DocumentResultViewProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col duration-500 animate-in fade-in slide-in-from-right-8">
      <section className="flex-1 overflow-y-auto px-6 pb-4">
        {isCorrect ? (
          <div className="flex flex-col items-center gap-2 pb-4 pt-4">
            {characterImageUrl && (
              <img
                src={characterImageUrl}
                alt="정답 캐릭터"
                className="h-[120px] w-[120px] object-contain"
              />
            )}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900"
            >
              <Check className="text-white" size={22} strokeWidth={3} />
            </motion.div>
            <h2 className="text-xl font-bold text-slate-900">
              완벽하게 찾아냈어요!
            </h2>
          </div>
        ) : (
          <div className="flex items-center justify-between pb-4 pt-4">
            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200"
              >
                <X className="text-slate-500" size={22} />
              </motion.div>
              <h2 className="text-xl font-bold text-slate-900">
                아쉬워요,
                <br />
                다시 확인해볼까요?
              </h2>
            </div>
            {characterImageUrl && (
              <img
                src={characterImageUrl}
                alt="오답 캐릭터"
                className="h-[120px] w-[120px] object-contain"
              />
            )}
          </div>
        )}

        <div className="mb-5">
          <DocumentCard
            data={documentCard}
            mode="result"
            correctIndex={correctIndex}
            selectedAnswerIndex={selectedAnswerIndex}
          />
        </div>

        <div className="rounded-xl border border-slate-100 bg-white px-4 py-4">
          <p className="mb-2 text-[10px] font-bold text-slate-400">해설</p>
          <p className="text-sm leading-relaxed text-slate-600">
            {explanation}
          </p>
        </div>
      </section>

      <QuizFooter onClick={onNext}>
        {isLastQuestion ? '학습 끝내기' : '다음 문제'}
      </QuizFooter>
    </div>
  );
}
