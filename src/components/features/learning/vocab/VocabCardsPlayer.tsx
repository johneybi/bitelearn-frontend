import { useEffect, useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from 'framer-motion';
import { MousePointerClick } from 'lucide-react';

import QuizHeader from '@/components/common/QuizHeader';
import QuizFooter from '@/components/common/QuizFooter';
import QuizIndicator from '@/components/features/learning/quiz/QuizIndicator';
import VocabCard from './VocabCard';

import type { ChoiceQuestionItem } from '@/mock/choiceQuestion';
import type { StepIndicatorInfo } from '@/components/features/learning/quiz/quiz.types';

type VocabCardsPlayerProps = {
  vocabs: ChoiceQuestionItem[];
  vocabIdx: number;
  onVocabIdxChange: (idx: number) => void;
  onComplete: () => Promise<void> | void;
  onBack: () => void;
  indicatorSteps?: StepIndicatorInfo[];
};

export default function VocabCardsPlayer({
  vocabs,
  vocabIdx,
  onVocabIdxChange,
  onComplete,
  onBack,
  indicatorSteps: externalSteps,
}: VocabCardsPlayerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const dragX = useMotionValue(0);
  const cardRotate = useTransform(dragX, [-150, 0, 150], [-8, 0, 8]);

  const currentVocab = vocabs[vocabIdx];
  const isFirstVocab = vocabIdx === 0;
  const isLastVocab = vocabIdx === vocabs.length - 1;

  useEffect(() => {
    dragX.set(0);
  }, [vocabIdx, dragX]);

  const localSteps: StepIndicatorInfo[] = useMemo(
    () =>
      vocabs.map((_, idx) => ({
        type: 'vocab',
        status: 'none',
        isCurrent: idx === vocabIdx,
      })),
    [vocabs, vocabIdx]
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

  const handleNext = async () => {
    if (isCompleting) return;

    if (isLastVocab) {
      setIsCompleting(true);
      try {
        await onComplete();
      } finally {
        setIsCompleting(false);
      }
      return;
    }

    setDirection(1);
    setIsFlipped(false);
    onVocabIdxChange(vocabIdx + 1);
  };

  const handlePrev = () => {
    if (isFirstVocab) return;

    setDirection(-1);
    setIsFlipped(false);
    onVocabIdxChange(vocabIdx - 1);
  };

  if (!currentVocab) {
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
            key={vocabIdx}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="perspective-1000 z-10 h-[480px] w-full max-w-[320px]"
          >
            <motion.div
              style={{ x: dragX, rotate: cardRotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const { offset, velocity } = info;
                if (offset.x < -80 || velocity.x < -500) {
                  handleNext();
                } else if (
                  (offset.x > 80 || velocity.x > 500) &&
                  !isFirstVocab
                ) {
                  handlePrev();
                }
              }}
              className="relative h-full w-full"
            >
              <VocabCard
                vocab={currentVocab}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped((prev) => !prev)}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isFlipped ? (
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
            ) : (
              <motion.div
                key="swipe-guide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-1.5 text-slate-300"
              >
                <span className="text-xs font-bold tracking-tight">
                  ← 스와이프로도 넘길 수 있어요
                </span>
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
                disabled={isCompleting}
                onPrevious={isFirstVocab ? undefined : handlePrev}
                onClick={handleNext}
              >
                {isLastVocab ? '단어 학습 완료하기' : '다음 단어 확인'}
              </QuizFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
