import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useShareArticle from '@/hooks/useShareArticle';
import { Bookmark, ChevronLeft, Copy, Share2 } from 'lucide-react';

type ArticleDetailHeaderProps = {
  onBack: () => void;
  title: string;
  articleId: string;
};

export default function ArticleDetailHeader({
  onBack,
  title,
  articleId,
}: ArticleDetailHeaderProps) {
  const shareUrl = `${window.location.origin}/articles/${articleId}`;

  const { handleCopyLink, handleSystemShare } = useShareArticle({
    title,
    url: shareUrl,
  });

  const canUseWebShare = typeof navigator !== 'undefined' && !!navigator.share;

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

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="아티클 공유"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-80 rounded-2xl border border-slate-200 p-4 shadow-lg"
          >
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 px-3 py-2">
                <p className="truncate text-xs text-slate-600">{shareUrl}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Copy className="h-4 w-4" />
                  링크 복사
                </button>

                <button
                  type="button"
                  onClick={handleSystemShare}
                  disabled={!canUseWebShare}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <Share2 className="h-4 w-4" />
                  공유하기
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
