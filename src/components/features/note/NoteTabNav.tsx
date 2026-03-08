import { Button } from '@/components/ui/button';
import type { NoteTab } from '@/pages/NotesPage';

type NoteTabNavProps = {
  activeTab: NoteTab;
  onChangeTab: (tab: NoteTab) => void;
};

export default function NoteTabNav({
  activeTab,
  onChangeTab,
}: NoteTabNavProps) {
  return (
    <nav className="flex gap-2 bg-white">
      <Button
        variant={activeTab === 'review' ? 'default' : 'secondary'}
        onClick={() => onChangeTab('review')}
        className={`h-10 flex-1 rounded-xl text-xs font-bold transition-all ${
          activeTab === 'review'
            ? 'bg-slate-900 text-white'
            : 'border-none bg-slate-100 text-slate-500'
        }`}
      >
        오답 복습
      </Button>

      <Button
        variant={activeTab === 'bookmark' ? 'default' : 'secondary'}
        onClick={() => onChangeTab('bookmark')}
        className={`h-10 flex-1 rounded-xl text-xs font-bold transition-all ${
          activeTab === 'bookmark'
            ? 'bg-slate-900 text-white'
            : 'border-none bg-slate-100 text-slate-500'
        }`}
      >
        저장한 글
      </Button>

      <Button
        variant={activeTab === 'history' ? 'default' : 'secondary'}
        onClick={() => onChangeTab('history')}
        className={`h-10 flex-1 rounded-xl text-xs font-bold transition-all ${
          activeTab === 'history'
            ? 'bg-slate-900 text-white'
            : 'border-none bg-slate-100 text-slate-500'
        }`}
      >
        학습 기록
      </Button>
    </nav>
  );
}
