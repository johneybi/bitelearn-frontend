import type { ReactNode } from 'react';

type QuizPassageProps = {
  questionSequence?: number;
  passageContent?: string;
  passageTitle?: string;
  media?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function QuizPassage({
  questionSequence,
  passageContent,
  passageTitle,
  media,
  children,
  className = '',
}: QuizPassageProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {passageTitle && (
        <h2 className="mb-6 px-1 text-lg font-bold leading-tight tracking-tight text-slate-900">
          <span className="mr-2 text-slate-400">
            {questionSequence ? `Q${questionSequence}.` : ''}
          </span>
          {passageTitle}
        </h2>
      )}

      {media}

      {passageContent && (
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all">
          <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-600">
            {passageContent}
          </p>
        </div>
      )}

      {children}
    </div>
  );
}
