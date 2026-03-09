import { useMemo, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';

import QuizHeader from '@/components/common/QuizHeader';
import QuizFooter from '@/components/common/QuizFooter';
import QuizIndicator from '@/components/features/learning/quiz/QuizIndicator';
import WordCard from './WordCard';

import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';
import type { StepIndicatorInfo } from '@/components/features/learning/quiz/quiz.types';

type WordCardsPlayerProps = {
  words: ChoiceQuestionItem[];
  wordIdx: number;
  onWordIdxChange: (idx: number) => void;
  onComplete: () => void;
  onBack: () => void;
  indicatorSteps?: StepIndicatorInfo[];
};

export default function WordCardsPlayer({
  words,
  wordIdx,
  onWordIdxChange,
  onComplete,
  onBack,
  indicatorSteps: externalSteps,
}: WordCardsPlayerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentWord = words[wordIdx];
  const isFirstWord = wordIdx === 0;
  const isLastWord = wordIdx === words.length - 1;

  const localSteps: StepIndicatorInfo[] = useMemo(
    () =>
      words.map((_, idx) => ({
        type: 'word',
        status: 'none',
        isCurrent: idx === wordIdx,
      })),
    [words, wordIdx]
  );

  const indicatorSteps = externalSteps ?? localSteps;

  const slideVariants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? '110%' : '-110%',
      y: isFlipped ? 0 : -40,
      opacity: 0,
    }),
    animate: {
      x: 0,
      y: isFlipped ? 0 : -40,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        y: { type: 'spring', stiffness: 200, damping: 25 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-110%' : '110%',
      y: isFlipped ? 0 : -40,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const handleNext = () => {
    if (isLastWord) {
      onComplete();
      return;
    }

    setDirection(1);
    setIsFlipped(false);
    onWordIdxChange(wordIdx + 1);
  };

  const handlePrev = () => {
    if (isFirstWord) return;

    setDirection(-1);
    setIsFlipped(false);
    onWordIdxChange(wordIdx - 1);
  };

  if (!currentWord) {
    return (
      <main className="flex h-full min-h-0 flex-col bg-white text-slate-900">
        <div className="z-20 shrink-0 border-b border-slate-100 bg-white">
          <QuizHeader
            title="생존 단어장"
            showCloseButton
            onCloseClick={onBack}
          />
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-sm font-medium text-slate-500">
            표시할 단어가 없습니다.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-full min-h-0 flex-col bg-slate-50 text-slate-900">
      <div className="z-20 shrink-0 border-b border-slate-100 bg-white">
        <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
        <QuizIndicator steps={indicatorSteps} />
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={wordIdx}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="perspective-1000 z-10 h-[480px] w-full max-w-[320px]"
          >
            <WordCard
              word={currentWord}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((prev) => !prev)}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex items-center justify-center">
          <AnimatePresence>
            {!isFlipped && (
              <motion.div
                key="flip-guide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col items-center gap-2 text-slate-400"
              >
                <MousePointerClick size={16} />
                <p className="text-sm font-bold tracking-tight">
                  카드를 뒤집어 확인해 보세요
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative min-h-[100px] shrink-0 border-t border-slate-100 bg-white">
        <AnimatePresence>
          {isFlipped && (
            <motion.div
              key="footer-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0"
            >
              <QuizFooter
                onPrevious={isFirstWord ? undefined : handlePrev}
                onClick={handleNext}
              >
                {isLastWord ? '단어 학습 완료하기' : '다음 단어 확인'}
              </QuizFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
