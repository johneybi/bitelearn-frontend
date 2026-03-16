import { useCallback, useState } from 'react';

import NoteTopNav from '@/components/features/note/NoteTopNav';
import ReviewNoteSection from '@/components/features/note/ReviewNoteSection';
import BookmarkSection from '@/components/features/note/BookmarkSection';
import useCursorInfiniteQuery from '@/hooks/useCursorInfiniteQuery';

import { MOCK_CATEGORY_CHAPTERS } from '@/mock/chapter';
import { fetchBookmarkedArticlePage } from '@/mock/fetchBookmarkedArticlePage';
import { fetchMistakeReviewPage } from '@/mock/fetchMistakeReviewPage';
import { MISTAKE_ITEMS } from '@/mock/mistakeNote';

export type NoteTab = 'review' | 'bookmark';

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<NoteTab>('review');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  const fetchReviewPage = useCallback(
    (cursor?: string | null) =>
      fetchMistakeReviewPage({
        cursor,
        categoryId: selectedCategoryId,
      }),
    [selectedCategoryId]
  );

  const fetchBookmarkPage = useCallback(
    (cursor?: string | null) =>
      fetchBookmarkedArticlePage({
        cursor,
      }),
    []
  );

  const reviewFeed = useCursorInfiniteQuery({
    queryKey: ['notes', 'review', selectedCategoryId],
    queryFn: fetchReviewPage,
    enabled: activeTab === 'review',
  });

  const bookmarkFeed = useCursorInfiniteQuery({
    queryKey: ['notes', 'bookmark'],
    queryFn: fetchBookmarkPage,
    enabled: activeTab === 'bookmark',
  });

  const totalMistakeCount = MISTAKE_ITEMS.length;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white text-slate-900">
      <div className="hide-scrollbar flex-1 overflow-y-auto pb-8">
        <NoteTopNav activeTab={activeTab} onChangeTab={setActiveTab} />

        <section className="pb-32 pt-6">
          {activeTab === 'review' && (
            <ReviewNoteSection
              selectedCategoryId={selectedCategoryId}
              onChangeCategory={setSelectedCategoryId}
              categories={MOCK_CATEGORY_CHAPTERS}
              mistakes={reviewFeed.items}
              totalExp={1250}
              totalMistakeCount={totalMistakeCount}
              isLoading={reviewFeed.isPending}
              isLoadingMore={reviewFeed.isFetchingNextPage}
              hasNext={Boolean(reviewFeed.hasNextPage)}
              sentinelRef={reviewFeed.sentinelRef}
            />
          )}

          {activeTab === 'bookmark' && (
            <div className="px-6">
              <BookmarkSection
                articles={bookmarkFeed.items}
                isLoading={bookmarkFeed.isPending}
                isLoadingMore={bookmarkFeed.isFetchingNextPage}
                hasNext={Boolean(bookmarkFeed.hasNextPage)}
                sentinelRef={bookmarkFeed.sentinelRef}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
