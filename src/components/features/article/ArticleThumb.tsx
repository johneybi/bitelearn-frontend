import { FileText } from 'lucide-react';

type ArticleThumbProps = {
  category: string;
};

export default function ArticleThumb({ category }: ArticleThumbProps) {
  return (
    <div className="flex h-full w-full items-center justify-center border-b border-slate-100 bg-slate-50">
      <div className="flex flex-col items-center gap-3 opacity-20">
        <FileText size={48} className="text-slate-900" />
        <span className="text-[10px] font-bold tracking-widest">
          {category}
        </span>
      </div>
    </div>
  );
}
