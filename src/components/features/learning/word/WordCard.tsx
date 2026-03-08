import { motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';

import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';

type WordCardProps = {
  word: ChoiceQuestionItem;
  isFlipped: boolean;
  onFlip: () => void;
};

export default function WordCard({ word, isFlipped, onFlip }: WordCardProps) {
  return (
    <motion.div
      className="preserve-3d relative h-full w-full cursor-pointer rounded-2xl shadow-md"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={onFlip}
    >
      {/* Front */}
      <div className="backface-hidden group absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-1 items-center justify-center overflow-hidden bg-slate-100">
          {word.imageUrl ? (
            <img
              src={word.imageUrl}
              alt={word.imageAlt}
              className="h-full w-full object-cover opacity-90 grayscale transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center text-6xl opacity-40">
              <span>📖</span>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-center border-t border-slate-100 bg-white p-8 text-center">
          <div className="mb-3 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {word.flavorText || '핵심 단어'}
            </span>
          </div>

          <h2 className="mb-6 break-keep text-xl font-bold text-slate-800">
            {word.choices[0]}
          </h2>

          <div className="flex items-center gap-2 text-slate-400">
            <MousePointerClick size={14} />
            <span className="text-xs font-medium">터치해서 의미 확인</span>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="backface-hidden rotate-y-180 absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-8 text-white shadow-xl">
        <div className="flex flex-1 flex-col justify-center overflow-y-auto">
          <h3 className="mb-6 text-center text-lg font-bold leading-tight">
            {word.question}
          </h3>

          <div className="mx-auto mb-8 h-1 w-10 rounded-full bg-slate-600" />

          <p className="whitespace-pre-line break-keep text-center text-[15px] font-medium leading-relaxed text-slate-200">
            {word.passage}
          </p>

          <div className="mt-8 rounded-xl border border-slate-700/50 bg-slate-900/50 p-5 shadow-inner">
            <p className="text-sm font-medium leading-relaxed text-slate-300">
              <span className="mr-2 text-slate-400">💡</span>
              {word.explanation}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
