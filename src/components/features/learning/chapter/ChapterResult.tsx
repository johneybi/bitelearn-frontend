import { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import chapterResultCloseImage from '@/assets/character/chapter_result_close.png';
import chapterResultFailImage from '@/assets/character/chapter_result_fail.png';
import chapterResultPerfectImage from '@/assets/character/chapter_result_perfect.png';
import level1Image from '@/assets/level/level_1.png';
import level2Image from '@/assets/level/level_2.png';
import level3Image from '@/assets/level/level_3.png';
import Header from '@/components/common/Header';
import { Button } from '@/components/ui/button';

type ResultVariant = 'perfect' | 'close' | 'fail';

type ChapterResultProps = {
  correct: number;
  total: number;
  accuracyRate: number;
  earnedBytes: number;
  lostBytes: number;
  currentLevel: number;
  currentTotalBytes: number;
  chapterTitle: string;
  onBack: () => void;
  onFinish: () => void;
  onRetryWrongAnswers?: () => void;
};

const LEVEL_RANGES = [
  { level: 1, minBytes: 0, maxBytes: 2000 },
  { level: 2, minBytes: 2000, maxBytes: 4000 },
  { level: 3, minBytes: 4000, maxBytes: 6000 },
] as const;

const LEVEL_BADGE_CLASS_NAME =
  'relative flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-[#ffedd5] bg-[#fff7ed] shadow-[0_4px_8px_rgba(237,238,246,0.95)]';
const PROGRESS_BAR_CLASS_NAME = 'from-[#fed7aa] to-[#fb923c]';
const EARNED_TEXT_CLASS_NAME = 'text-[#4ade80]';
const LOST_TEXT_CLASS_NAME = 'text-[#f87171]';
const LEVEL_IMAGES = {
  1: level1Image,
  2: level2Image,
  3: level3Image,
} as const;

const VARIANT_CONFIG = {
  perfect: {
    image: chapterResultPerfectImage,
    title: '야호! 소중한 500 바이트를\n완벽하게 지켰어요!',
    description:
      '사기꾼도 울고 갈 완벽한 지식!\n오늘 멍뭉이는 험난한 인생을 요리조리 피해서\n바이트를 안전하게 지켜냈어요. 멋진 어른이네요!',
    buttonLabel: '다음 챕터로 이동하기',
    showCelebration: true,
  },
  close: {
    image: chapterResultCloseImage,
    title: '휴우~ 아슬아슬하게\n바이트 방어에 성공했어요!',
    description:
      '몇 개는 헷갈려서 바이트를 조금 흘렸지만,\n다행히도 치명적인 손해는 막았어요.\n다시 공부해서 바이트를 다시 되찾으러 가볼까요?',
    buttonLabel: '다음 챕터로 이동하기',
    showCelebration: false,
  },
  fail: {
    image: chapterResultFailImage,
    title: '앗... 나쁜 어른들에게\n소중한 바이트를 털렸어요',
    description:
      '세상 물정 모르는 멍뭉이,\n다시 실수 하지 않도록 공부해서\n잃어버린 바이트를 되찾아봐요!',
    buttonLabel: '다음 챕터로 이동하기',
    showCelebration: false,
  },
} as const;

function formatBytes(value: number) {
  return `${new Intl.NumberFormat('ko-KR').format(Math.max(0, value))} B`;
}

function CelebrationParticles() {
  const coins = [
    { left: '8%', top: '7%', delay: 0.1, duration: 3.2, size: 38 },
    { left: '22%', top: '1%', delay: 0.45, duration: 3.6, size: 56 },
    { left: '76%', top: '4%', delay: 0.2, duration: 3.1, size: 54 },
    { left: '88%', top: '17%', delay: 0.5, duration: 3.7, size: 40 },
    { left: '10%', top: '30%', delay: 0.35, duration: 3.4, size: 34 },
  ];

  const confetti = [
    { left: '18%', top: '15%', color: '#fb7185', rotate: -18, delay: 0 },
    { left: '28%', top: '9%', color: '#38bdf8', rotate: 22, delay: 0.25 },
    { left: '35%', top: '4%', color: '#facc15', rotate: -40, delay: 0.1 },
    { left: '63%', top: '7%', color: '#4ade80', rotate: 18, delay: 0.2 },
    { left: '72%', top: '16%', color: '#a78bfa', rotate: -22, delay: 0.35 },
    { left: '82%', top: '11%', color: '#fb923c', rotate: 34, delay: 0.15 },
    { left: '86%', top: '28%', color: '#22c55e', rotate: -14, delay: 0.4 },
    { left: '21%', top: '28%', color: '#f59e0b', rotate: 32, delay: 0.3 },
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[240px] overflow-hidden">
      {coins.map((coin, index) => (
        <motion.div
          key={`coin-${index}`}
          className="absolute rounded-full border border-[#f6c86d] bg-[radial-gradient(circle_at_35%_35%,#f9e4a8_0%,#f3c85f_55%,#d9a63a_100%)] shadow-[0_6px_14px_rgba(217,166,58,0.24)]"
          initial={{ y: -12, opacity: 0, scale: 0.9 }}
          animate={{ y: [0, 6, 0], opacity: 1, rotate: [0, 10, -6, 0] }}
          transition={{
            duration: coin.duration,
            delay: coin.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          style={{
            left: coin.left,
            top: coin.top,
            width: coin.size,
            height: coin.size,
          }}
        />
      ))}

      {confetti.map((piece, index) => (
        <motion.div
          key={`confetti-${index}`}
          className="absolute h-2 rounded-full"
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.55] }}
          transition={{
            duration: 2.4,
            delay: piece.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          style={{
            left: piece.left,
            top: piece.top,
            width: 10,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChapterResult({
  accuracyRate,
  earnedBytes,
  lostBytes,
  currentLevel,
  currentTotalBytes,
  chapterTitle,
  onBack,
  onFinish,
  onRetryWrongAnswers,
}: ChapterResultProps) {
  void onRetryWrongAnswers;
  void chapterTitle;

  const [isProgressVisible, setIsProgressVisible] = useState(false);

  const variant: ResultVariant = useMemo(() => {
    if (accuracyRate === 100) return 'perfect';
    if (accuracyRate >= 60) return 'close';
    return 'fail';
  }, [accuracyRate]);

  const cfg = VARIANT_CONFIG[variant];

  const levelState = useMemo(() => {
    const derivedLevel =
      LEVEL_RANGES.find(
        ({ minBytes, maxBytes }) =>
          currentTotalBytes >= minBytes && currentTotalBytes < maxBytes
      ) ?? LEVEL_RANGES[LEVEL_RANGES.length - 1];
    const levelRange =
      LEVEL_RANGES.find(({ level }) => level === currentLevel) ?? derivedLevel;
    const clampedBytes = Math.min(currentTotalBytes, levelRange.maxBytes);
    const remainingBytes = Math.max(0, levelRange.maxBytes - clampedBytes);
    const progressPercentage = Math.min(
      100,
      Math.max(
        0,
        ((clampedBytes - levelRange.minBytes) /
          Math.max(1, levelRange.maxBytes - levelRange.minBytes)) *
          100
      )
    );

    return {
      currentLevel: levelRange.level,
      title: levelRange.level === 3 ? '3레벨 완성까지' : '다음 레벨까지',
      remainingLabel:
        levelRange.level === 3 && currentTotalBytes >= levelRange.maxBytes
          ? 'MAX'
          : formatBytes(remainingBytes),
      progressPercentage,
    };
  }, [currentLevel, currentTotalBytes]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsProgressVisible(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex h-full min-h-0 flex-col overflow-hidden bg-background text-slate-950">
      {cfg.showCelebration && <CelebrationParticles />}

      <Header showCloseButton onCloseClick={onBack} className="bg-background" />

      <div className="flex-1 overflow-y-auto px-5 pb-[144px] pt-[60px]">
        <section className="mx-auto flex w-full max-w-[335px] flex-col items-center pt-5 text-center">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="relative mb-5 flex h-[228px] w-[228px] items-center justify-center"
          >
            <img
              src={cfg.image}
              alt="chapter result character"
              className="h-full w-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="whitespace-pre-line text-[20px] font-bold leading-8 tracking-[-0.02em] text-slate-950">
              {cfg.title}
            </p>
            <p className="whitespace-pre-line text-sm leading-[22px] text-slate-600">
              {cfg.description}
            </p>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mx-auto mt-7 w-full max-w-[335px] rounded-2xl border-2 border-slate-100 bg-card p-4 shadow-[0_12px_16px_rgba(237,238,246,0.95)]"
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={LEVEL_BADGE_CLASS_NAME}
              aria-label={`현재 ${levelState.currentLevel}레벨`}
            >
              <img
                src={LEVEL_IMAGES[levelState.currentLevel]}
                alt=""
                className="h-[52px] w-[52px] object-contain"
              />
              <span className="absolute -bottom-1 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold leading-none text-[#fb923c] shadow-sm">
                LV.{levelState.currentLevel}
              </span>
            </button>

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold leading-5 text-slate-950">
                  {levelState.title}
                </p>
                <p className="shrink-0 text-xs font-bold leading-4 text-slate-400">
                  {levelState.remainingLabel}
                </p>
              </div>

              <div className="h-[10px] overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isProgressVisible
                      ? `${levelState.progressPercentage}%`
                      : '0%',
                  }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${PROGRESS_BAR_CLASS_NAME}`}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-100/80 px-3 py-3 text-center shadow-sm">
              <p className="text-[11px] font-medium leading-4 text-slate-950">
                지켜낸 바이트
              </p>
              <p
                className={`mt-1 text-[17px] font-extrabold leading-[25.5px] ${EARNED_TEXT_CLASS_NAME}`}
              >
                +{formatBytes(earnedBytes)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100/80 px-3 py-3 text-center shadow-sm">
              <p className="text-[11px] font-medium leading-4 text-slate-600">
                잃어버린 바이트
              </p>
              <p
                className={`mt-1 text-[17px] font-extrabold leading-[25.5px] ${LOST_TEXT_CLASS_NAME}`}
              >
                -{formatBytes(lostBytes)}
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      <footer className="absolute inset-x-0 bottom-0 z-20 bg-white/[0.92] px-5 pb-8 pt-4 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[335px]">
          <Button
            className="relative h-14 w-full rounded-2xl bg-[#18e08f] px-5 text-base font-bold text-slate-950 shadow-none hover:bg-[#10cf82]"
            onClick={onFinish}
          >
            <span>{cfg.buttonLabel}</span>
            <ChevronRight className="absolute right-5 h-6 w-6" />
          </Button>
        </div>
      </footer>
    </main>
  );
}
