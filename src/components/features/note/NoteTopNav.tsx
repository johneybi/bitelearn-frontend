import type { NoteTab } from '@/pages/NotesPage';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type NoteTopNavProps = {
  activeTab: NoteTab;
  onChangeTab: (tab: NoteTab) => void;
};

const NOTE_TABS: { value: NoteTab; label: string }[] = [
  { value: 'review', label: '오답 복습' },
  { value: 'bookmark', label: '저장한 글' },
];

export default function NoteTopNav({
  activeTab,
  onChangeTab,
}: NoteTopNavProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onChangeTab(value as NoteTab)}
      className="sticky top-0 z-20 w-full border-b border-slate-100 bg-white"
    >
      <TabsList className="flex w-full items-stretch justify-start rounded-none bg-white p-0 pt-12">
        {NOTE_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-1 rounded-none border-b-2 border-transparent bg-white px-0 py-6 text-sm font-bold text-slate-400 shadow-none ring-0 transition-all hover:bg-slate-50 hover:text-slate-900 data-[state=active]:border-slate-900 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
