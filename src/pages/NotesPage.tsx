import {
  useEffect,
  useState,
} from 'react';

import NoteTopNav from '@/components/features/note/NoteTopNav';
import ReviewNoteSection from '@/components/features/note/ReviewNoteSection';
import BookmarkSection from '@/components/features/note/BookmarkSection';
import useNotesCategorySearchParam from '@/hooks/useNotesCategorySearchParam';

import { useIncorrectNotesQuery } from '@/api/notes/notes.query';
import { LEARNING_NAVIGATION } from '@/constants/learningNavigation';
import {
  fetchBookmarkedArticlePage,
  type BookmarkedArticleCardItem,
} from '@/mock/fetchBookmarkedArticlePage';

export type NoteTab = 'review' | 'bookmark';

// 오답노트 카테고리 필터에 사용할 API 기준 카테고리 목록
const NOTE_CATEGORIES = LEARNING_NAVIGATION.map((category) => ({
  category: category.code,
  categoryName: category.name,
}));

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<NoteTab>('review');
  const [bookmarkArticles, setBookmarkArticles] = useState<
    BookmarkedArticleCardItem[]
  >([]);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  // 선택 카테고리를 URL 쿼리스트링 기준으로 관리
  const { selectedCategory, setSelectedCategory } =
    useNotesCategorySearchParam(NOTE_CATEGORIES);

  // 리뷰 탭 활성화 시에만 오답노트 무한스크롤 조회 실행
  const reviewFeed = useIncorrectNotesQuery({
    category: selectedCategory,
    enabled: activeTab === 'review',
  });

  useEffect(() => {
    let isMounted = true;

    const loadBookmarks = async () => {
      setIsBookmarkLoading(true);

      try {
        // 북마크 목록은 실제 조회 API 대신 mock 데이터를 한 번만 불러와 사용
        const response = await fetchBookmarkedArticlePage({
          pageSize: 1000,
        });

        if (!isMounted) {
          return;
        }

        setBookmarkArticles(response.items);
      } finally {
        if (isMounted) {
          setIsBookmarkLoading(false);
        }
      }
    };

    void loadBookmarks();

    return () => {
      isMounted = false;
    };
  }, []);

  // 요약 카드에는 첫 페이지 응답의 집계 값 사용
  const totalNoteCount = reviewFeed.data?.pages[0]?.totalCount ?? 0;
  const totalBytes = reviewFeed.data?.pages[0]?.totalBytes ?? 0;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white text-slate-900">
      <div className="hide-scrollbar flex-1 overflow-y-auto pb-8">
        <NoteTopNav activeTab={activeTab} onChangeTab={setActiveTab} />

        <section className="pb-32 pt-6">
          {activeTab === 'review' && (
            <ReviewNoteSection
              selectedCategory={selectedCategory}
              onChangeCategory={setSelectedCategory}
              categories={NOTE_CATEGORIES}
              notes={reviewFeed.notes}
              totalBytes={totalBytes}
              totalNoteCount={totalNoteCount}
              isLoading={reviewFeed.isPending}
              isLoadingMore={reviewFeed.isFetchingNextPage}
              hasNext={Boolean(reviewFeed.hasNextPage)}
              sentinelRef={reviewFeed.sentinelRef}
            />
          )}

          {activeTab === 'bookmark' && (
            <div className="px-6">
              <BookmarkSection
                articles={bookmarkArticles}
                isLoading={isBookmarkLoading}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
