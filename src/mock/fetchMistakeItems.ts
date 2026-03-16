import type { MistakeItem } from '@/types/mistake';
import { MISTAKE_ITEMS } from './mistakeNote';
import { withDelay } from './withDelay';
import { paginateByCursor } from './paginateByCursor';

const DEFAULT_SIZE = 10;

type FetchMistakeItemsParams = {
  cursor?: string | null; // 현재 페이지의 cursor
  categoryId?: string; // 선택된 카테고리 필터
  pageSize?: number; // 한 번에 가져올 아이템 수
};

export async function fetchMistakeItems({
  cursor,
  categoryId,
  pageSize = DEFAULT_SIZE,
}: FetchMistakeItemsParams) {
  // 최신 오답이 먼저 보이도록 wrongAt 기준 내림차순 정렬
  const sortedMistakes = [...MISTAKE_ITEMS].sort(
    (a, b) => new Date(b.wrongAt).getTime() - new Date(a.wrongAt).getTime()
  );

  // 카테고리 필터 적용
  const filteredMistakes =
    !categoryId || categoryId === 'all'
      ? sortedMistakes
      : sortedMistakes.filter((item) => item.categoryId === categoryId);

  // 현재 cursor 기준으로 pageSize만큼 잘라낸 뒤 nextCursor / hasNext를 계산
  const paginatedResult = paginateByCursor<MistakeItem>({
    cursor,
    pageSize,
    items: filteredMistakes,
    getCursor: (item) => item.wrongAt,
  });

  return withDelay(paginatedResult);
}
