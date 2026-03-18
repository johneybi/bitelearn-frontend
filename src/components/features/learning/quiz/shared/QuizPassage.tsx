import type { ReactNode } from 'react';

type QuizPassageProps = {
  questionTitle?: string;
  questionNumber?: number;
  passageContent?: string;
  passageTitle?: string;
  children?: ReactNode;
  hidePassage?: boolean;
  hidePassageTitle?: boolean;
  className?: string;
};

export default function QuizPassage({
  questionTitle,
  questionNumber,
  passageContent,
  passageTitle,
  children,
  hidePassage = false,
  hidePassageTitle = false,
  className = '',
}: QuizPassageProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {questionTitle && (
        <h2 className="mb-6 px-1 text-lg font-bold leading-tight tracking-tight text-slate-900">
          <span className="mr-2 text-slate-400">
            {questionNumber ? `Q${questionNumber}.` : ''}
          </span>
          {questionTitle}
        </h2>
      )}

      {!hidePassage && passageContent && (
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all">
          <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-600">
            {passageContent}
          </p>
        </div>
      )}

      {!hidePassageTitle && passageTitle && (
        <div className="mb-6 flex items-start gap-2 px-1">
          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
          <p className="whitespace-pre-line text-sm font-bold leading-relaxed text-slate-900">
            {passageTitle}
          </p>
        </div>
      )}

      {children}
    </div>
  );
}
