import { useMemo, useState } from 'react';

import NoteHeader from '@/components/features/note/NoteHeader';
import NoteTabNav from '@/components/features/note/NoteTabNav';
import ReviewNoteSection from '@/components/features/note/ReviewNoteSection';
import BookmarkSection from '@/components/features/note/BookmarkSection';

import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';
import { MISTAKE_ITEMS } from '@/mock/mistakeNote';
import { mockArticles } from '@/mock/article';
import { MOCK_USER } from '@/mock/user';

export type NoteTab = 'review' | 'bookmark' | 'history';

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<NoteTab>('review');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  const totalCompleted = MOCK_CATEGORY_CHAPTERS.reduce(
    (acc, cat) => acc + cat.completedChapters,
    0
  );

  const totalChapters = MOCK_CATEGORY_CHAPTERS.reduce(
    (acc, cat) => acc + cat.totalChapters,
    0
  );

  const filteredMistakes = useMemo(() => {
    const sorted = [...MISTAKE_ITEMS].sort(
      (a, b) => new Date(b.wrongAt).getTime() - new Date(a.wrongAt).getTime()
    );

    if (selectedCategoryId === 'all') return sorted;

    return sorted.filter((item) => item.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  const bookmarkedArticles = useMemo(() => {
    return mockArticles.slice(0, 2);
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white text-slate-900">
      <div className="hide-scrollbar flex-1 overflow-y-auto pb-8">
        <NoteHeader
          totalCompleted={totalCompleted}
          totalChapters={totalChapters}
          consecutiveDays={MOCK_USER.consecutiveDays}
          totalExp={MOCK_USER.totalExp}
        />

        <div className="bg-white px-6 pt-6">
          <NoteTabNav activeTab={activeTab} onChangeTab={setActiveTab} />
        </div>

        <section className="px-6 pb-32 pt-6">
          {activeTab === 'review' && (
            <ReviewNoteSection
              selectedCategoryId={selectedCategoryId}
              onChangeCategory={setSelectedCategoryId}
              categories={MOCK_CATEGORY_CHAPTERS}
              mistakes={filteredMistakes}
            />
          )}

          {activeTab === 'bookmark' && (
            <BookmarkSection articles={bookmarkedArticles} />
          )}
        </section>
      </div>
    </div>
  );
}
