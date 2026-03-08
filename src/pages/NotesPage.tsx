import NoteHeader from '@/components/features/note/NoteHeader';

import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';
import { MOCK_USER } from '@/mock/user';

export type NoteTab = 'review' | 'bookmark' | 'history';

export default function NotesPage() {
  const totalCompleted = MOCK_CATEGORY_CHAPTERS.reduce(
    (acc, cat) => acc + cat.completedChapters,
    0
  );

  const totalChapters = MOCK_CATEGORY_CHAPTERS.reduce(
    (acc, cat) => acc + cat.totalChapters,
    0
  );

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white text-slate-900">
      <div className="hide-scrollbar flex-1 overflow-y-auto pb-8">
        <NoteHeader
          totalCompleted={totalCompleted}
          totalChapters={totalChapters}
          consecutiveDays={MOCK_USER.consecutiveDays}
          totalExp={MOCK_USER.totalExp}
        />
      </div>
    </div>
  );
}
