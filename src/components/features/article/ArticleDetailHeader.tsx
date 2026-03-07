import { Bookmark, ChevronLeft, Share2 } from 'lucide-react';

type ArticleDetailHeaderProps = {
  onBack: () => void;
};

export default function ArticleDetailHeader({
  onBack,
}: ArticleDetailHeaderProps) {
  return (
    <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-slate-100 bg-white/90 px-2 backdrop-blur-md">
      <button
        type="button"
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition-colors hover:bg-slate-100"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="flex gap-1">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100"
        >
          <Bookmark className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
