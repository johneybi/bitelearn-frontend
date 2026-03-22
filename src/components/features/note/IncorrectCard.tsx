import type { Topic } from '@/api/learning/learning.types';
import { CalendarDays, Clock3, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  formatDate,
  formatTime,
} from '@/utils/formatDate';

type IncorrectCardProps = {
  categoryName: string;
  createdAt: string;
  topic: Topic;
  questionTitle: string;
  onSelect?: () => void;
  onRetry?: () => void;
};

const TOPIC_LABEL: Record<Topic, string> = {
  JEONSE: '전세',
  MONTHLY_RENT: '월세',
  BUYING: '매매',
};

export default function IncorrectCard({
  categoryName,
  createdAt,
  topic,
  questionTitle,
  onSelect,
  onRetry,
}: IncorrectCardProps) {
  return (
    <article
      className="group relative flex cursor-pointer flex-col items-start rounded-[28px] border-2 border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-300 active:scale-[0.98]"
      onClick={onSelect}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <span className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-tighter text-slate-500">
          {categoryName}
        </span>

        <div className="flex items-center gap-3 text-slate-300">
          <div className="flex items-center gap-1 text-[11px] font-bold">
            <CalendarDays size={12} />
            {formatDate(createdAt)}
          </div>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {TOPIC_LABEL[topic]}
        </p>
        <h3 className="break-keep text-base font-bold leading-snug text-slate-900">
          {questionTitle}
        </h3>
      </div>

      <div className="flex w-full items-center justify-between border-t border-slate-50 pt-5">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Clock3 size={12} />
          <span className="text-[11px] font-bold uppercase">{formatTime(createdAt)}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            onRetry?.();
            onSelect?.();
          }}
          className="h-9 gap-1.5 rounded-full border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
        >
          <RotateCcw size={13} strokeWidth={2.5} />
          오답 보기
        </Button>
      </div>

      <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-slate-100 transition-colors group-hover:bg-slate-900" />
    </article>
  );
}
