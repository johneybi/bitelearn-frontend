import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import QuizHeader from '@/components/common/QuizHeader';
import { Button } from '@/components/ui/button';

type ResultVariant = 'perfect' | 'close' | 'fail';

type ChapterResultProps = {
  correct: number;
  total: number;
  accuracyRate: number;
  earnedBytes: number;
  chapterTitle: string;
  onBack: () => void;
  onFinish: () => void;
  onRetryWrongAnswers?: () => void;
};

const VARIANT_CONFIG = {
  perfect: {
    image: '/images/character/dog_perfect.png',
    emoji: '🪙✨',
    title: '야호! 멍멍이의 소중한 500 바이트를\n완벽하게 지켰어요!',
    description:
      '사기꾼도 울고 갈 완벽한 지식!\n오늘 멍멍이는 위험한 함정들을 요리조리 피해서 바이트를 안전하게 지켜냈습니다. 멋진 어른이네요!',
    primaryBtn: '다음 챕터 학습하기',
    secondaryBtn: undefined,
    confetti: true,
  },
  close: {
    image: '/images/character/dog_close.png',
    emoji: '💦',
    title: '휴우~ 아슬아슬하게\n바이트 방어 성공!',
    description:
      '몇 개는 헷갈려서 바이트를 조금 흘렸지만, 치명적인 손해는 막았어요.\n틀린 부분만 다시 주우러 가볼까요?',
    primaryBtn: '다음 챕터 학습하기',
    secondaryBtn: '오답 풀고 바이트 되찾기',
    confetti: false,
  },
  fail: {
    image: '/images/character/dog_fail.png',
    emoji: '😭',
    title: '앗... 나쁜 어른들에게\n500 바이트를 털렸어요',
    description:
      '세상 물정 모르는 멍멍이, 결국 함정에 빠져 소중한 바이트가 털려버렸네요.\n얼른 다시 공부해서 잃어버린 내 바이트를 되찾아올까요?',
    primaryBtn: '다음 챕터 학습하기',
    secondaryBtn: '오답 풀고 바이트 되찾기',
    confetti: false,
  },
} as const;

function CoinParticles() {
  const coins = [
    { x: '10%', delay: 0, rotate: 15 },
    { x: '25%', delay: 0.1, rotate: -10 },
    { x: '45%', delay: 0.2, rotate: 5 },
    { x: '65%', delay: 0.05, rotate: -20 },
    { x: '80%', delay: 0.15, rotate: 10 },
    { x: '55%', delay: 0.3, rotate: -5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {coins.map((coin, index) => (
        <motion.div
          key={index}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 820, opacity: [0, 1, 1, 0], rotate: coin.rotate }}
          transition={{ duration: 2.8, delay: coin.delay, ease: 'easeIn' }}
          className="absolute text-2xl"
          style={{ left: coin.x }}
        >
          🪙
        </motion.div>
      ))}
    </div>
  );
}

export default function ChapterResult({
  correct,
  total,
  accuracyRate,
  earnedBytes,
  chapterTitle,
  onBack,
  onFinish,
  onRetryWrongAnswers,
}: ChapterResultProps) {
  const [animated, setAnimated] = useState(false);

  const variant: ResultVariant = useMemo(() => {
    if (accuracyRate === 100) return 'perfect';
    if (accuracyRate >= 60) return 'close';
    return 'fail';
  }, [accuracyRate]);

  const cfg = VARIANT_CONFIG[variant];

  useEffect(() => {
    const timer = window.setTimeout(() => setAnimated(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white text-slate-900">
      {cfg.confetti && <CoinParticles />}

      <div className="relative z-20 shrink-0 border-b border-slate-100 bg-white">
        <QuizHeader title="퀴즈 결과" onCloseClick={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <section className="flex flex-col items-center px-6 pb-2 pt-4 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="mb-4 h-44 w-44"
          >
            <img
              src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${cfg.image}`}
              alt="result dog illustration"
              className="h-full w-full object-contain"
            />
          </motion.div>

          <div className="mb-2 text-3xl">{cfg.emoji}</div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="whitespace-pre-line text-[22px] font-extrabold leading-snug tracking-tight text-slate-900"
          >
            {cfg.title}
          </motion.h2>

          <p className="mt-2 text-xs font-semibold text-slate-400">
            {chapterTitle}
          </p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-500"
          >
            {cfg.description}
          </motion.p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-5 mt-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">
              으른 레벨업 게이지
            </span>
            <span className="text-sm font-bold text-slate-700">
              {accuracyRate}% 📈
            </span>
          </div>

          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: animated ? `${accuracyRate}%` : 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-slate-900"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-center">
              <p className="text-[11px] font-medium text-slate-500">
                지켜낸 바이트
              </p>
              <p className="mt-0.5 text-[17px] font-extrabold text-emerald-600">
                +{earnedBytes} B
              </p>
            </div>

            <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-center">
              <p className="text-[11px] font-medium text-slate-500">
                잃어버린 바이트
              </p>
              <p className="mt-0.5 text-[17px] font-extrabold text-slate-400">
                -
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-left">
            <p className="text-xs font-medium text-slate-500">정답률</p>
            <p className="mt-1 text-lg font-extrabold text-slate-900">
              {accuracyRate}% · {correct} / {total} 정답
            </p>
          </div>
        </motion.section>

        <div className="h-4" />
      </div>

      <footer className="relative z-20 shrink-0 border-t border-slate-100 bg-white px-5 pb-8 pt-4">
        <div className="flex flex-col gap-2">
          <Button
            className="h-14 w-full rounded-2xl bg-slate-900 text-base font-bold text-white shadow-none hover:bg-slate-700"
            onClick={onFinish}
          >
            {cfg.primaryBtn}
          </Button>

          {cfg.secondaryBtn && (
            <Button
              variant="outline"
              className="h-14 w-full rounded-2xl border-slate-200 text-base font-bold text-slate-700 shadow-none hover:bg-slate-50"
              onClick={onRetryWrongAnswers}
            >
              {cfg.secondaryBtn}
            </Button>
          )}
        </div>
      </footer>
    </main>
  );
}
