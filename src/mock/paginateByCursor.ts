import type { CursorResponse } from '@/api/common/pagination.type';

type CursorPaginateOptions<T> = {
  items: T[]; // 이미 정렬/필터링이 끝난 전체 데이터 목록
  cursor?: string | null; // 현재 요청의 cursor (첫 요청이면 null)
  pageSize: number; // 한 번에 가져올 데이터 개수
  getCursor: (item: T) => string; // 각 item에서 cursor 값을 추출하는 함수
};

export function paginateByCursor<T>({
  items,
  cursor,
  pageSize,
  getCursor,
}: CursorPaginateOptions<T>): CursorResponse<T> {
  const startIndex = cursor
    ? items.findIndex((item) => getCursor(item) === cursor) + 1
    : 0;

  // startIndex부터 pageSize만큼 잘라서 현재 페이지 데이터 생성
  const pagedItems = items.slice(startIndex, startIndex + pageSize);

  const lastItem = pagedItems[pagedItems.length - 1];
  const hasNext = startIndex + pageSize < items.length;

  return {
    items: pagedItems,
    nextCursor: hasNext && lastItem ? getCursor(lastItem) : null,
    hasNext,
  };
}
