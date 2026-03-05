import { useMemo, useState } from 'react';
import QuizHeader from '@/components/common/QuizHeader';
import QuizFooter from '@/components/common/QuizFooter';
import type {
  ChoiceQuestionItem,
  ChoiceQuestionSet,
} from '@/mock/choiceQuestion';

type WordLearningProps = {
  wordSet: ChoiceQuestionSet;
  onBack: () => void;
};

export default function WordLearning({ wordSet, onBack }: WordLearningProps) {
  const words = useMemo(
    () =>
      wordSet.questions.filter(
        (q): q is ChoiceQuestionItem => q.type === 'word'
      ),
    [wordSet]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentWord = words[currentIndex];

  // 다음 / 이전 이동
  const handleNext = () => {
    if (currentIndex >= words.length - 1) {
      onBack();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setIsFlipped(false);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;

    setCurrentIndex((prev) => prev - 1);
    setIsFlipped(false);
  };

  if (!currentWord) {
    return (
      <main className="relative flex flex-1 flex-col overflow-hidden border border-slate-200 bg-slate-50 text-slate-900 shadow-xl">
        <div className="z-20 shrink-0 bg-white">
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
    <main className="relative flex flex-1 flex-col overflow-hidden border border-slate-200 bg-slate-50 text-slate-900 shadow-xl">
      <div className="z-20 shrink-0 bg-white">
        <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
      </div>

      {/* 진행 상태 */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <span className="text-sm font-semibold text-slate-600">
          학습 진행도
        </span>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* 카드 영역 */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div
          className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-md"
          onClick={() => setIsFlipped((prev) => !prev)}
        >
          {!isFlipped ? (
            <>
              <h2 className="mb-4 text-xl font-bold text-slate-800">
                {currentWord.choices?.[0] ?? '단어'}
              </h2>

              <p className="text-sm text-slate-500">터치해서 숨은 의미 확인</p>
            </>
          ) : (
            <>
              <h3 className="mb-4 text-lg font-semibold text-emerald-500">
                {currentWord.question}
              </h3>

              <p className="text-sm text-slate-600">
                {currentWord.explanation}
              </p>
            </>
          )}
        </div>
      </div>

      <QuizFooter
        disabled={!isFlipped}
        previousDisabled={currentIndex === 0}
        onPrevious={handlePrev}
        onClick={handleNext}
      >
        {currentIndex === words.length - 1 ? '학습 완료 (홈으로)' : '다음 단어'}
      </QuizFooter>
    </main>
  );
}
