import { useEffect, useState } from 'react';
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryKey,
} from '@tanstack/react-query';
import type { CursorResponse } from '@/api/common/pagination.type';

const INFINITE_SCROLL_ROOT_MARGIN = '400px';

type UseCursorInfiniteQueryParams<T> = {
  queryKey: QueryKey;
  queryFn: (cursor?: string | null) => Promise<CursorResponse<T>>;
  enabled?: boolean;
  rootMargin?: string;
};

export default function useCursorInfiniteQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
  rootMargin = INFINITE_SCROLL_ROOT_MARGIN,
}: UseCursorInfiniteQueryParams<T>) {
  // 무한스크롤 감지를 위한 sentinel DOM 노드
  const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null);

  // TanStack Query의 무한 쿼리
  const query = useInfiniteQuery<
    CursorResponse<T>,
    Error,
    InfiniteData<CursorResponse<T>>,
    QueryKey,
    string | null
  >({
    queryKey,
    enabled,
    initialPageParam: null,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });

  // IntersectionObserver 설정
  useEffect(() => {
    // observer르ㄹ 생성하지 않는 조건
    if (
      !enabled ||
      !sentinelNode ||
      !query.hasNextPage ||
      query.isFetchingNextPage ||
      query.isPending
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        // sentinel이 화면에 들어오면 다음 페이지 요청
        if (entry?.isIntersecting) {
          void query.fetchNextPage();
        }
      },
      { rootMargin }
    );

    observer.observe(sentinelNode);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enabled,
    query.fetchNextPage,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.isPending,
    rootMargin,
    sentinelNode,
  ]);

  return {
    ...query,
    items: query.data?.pages.flatMap((page) => page.items) ?? [],
    sentinelRef: setSentinelNode,
  };
}
