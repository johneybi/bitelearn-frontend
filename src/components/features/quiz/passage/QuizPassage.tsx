import type { ReactNode } from 'react';

type QuestionPassageProps = {
  questionText?: string;
  questionNumber?: number;
  passage?: string;
  flavorText?: string;
  children?: ReactNode;
  hidePassage?: boolean;
  hideFlavorText?: boolean;
  className?: string;
};

export default function QuestionPassage({
  questionText,
  questionNumber,
  passage,
  flavorText,
  children,
  hidePassage = false,
  hideFlavorText = false,
  className = '',
}: QuestionPassageProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {questionText && (
        <h2 className="mb-6 px-1 text-lg font-bold leading-tight tracking-tight text-slate-900">
          <span className="mr-2 text-slate-400">
            {questionNumber ? `Q${questionNumber}.` : ''}
          </span>
          {questionText}
        </h2>
      )}

      {!hidePassage && passage && (
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all">
          <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-600">
            {passage}
          </p>
        </div>
      )}

      {!hideFlavorText && flavorText && (
        <div className="mb-6 flex items-start gap-2 px-1">
          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
          <p className="whitespace-pre-line text-sm font-bold leading-relaxed text-slate-900">
            {flavorText}
          </p>
        </div>
      )}

      {children}
    </div>
  );
}
