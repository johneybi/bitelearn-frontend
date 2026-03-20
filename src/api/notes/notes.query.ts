import type { Category } from '@/api/learning/learning.types';
import { getNotes } from './notes.api';
import useIncorrectNotesInfiniteQuery from '@/hooks/useIncorrectNotesInfiniteQuery';

export const notesQueryKeys = {
  // 카테고리별 오답노트 데이터를 서로 다른 캐시로 구분
  incorrect: (category: Category | null) =>
    ['notes', 'incorrect', category ?? 'ALL'] as const,
};

type UseIncorrectNotesQueryParams = {
  category: Category | null;
  enabled?: boolean;
};

export function useIncorrectNotesQuery({
  category,
  enabled = true,
}: UseIncorrectNotesQueryParams) {
  // 오답노트 조회에 필요한 queryKey / queryFn 조합을 도메인 레벨에서 캡슐화
  return useIncorrectNotesInfiniteQuery({
    queryKey: notesQueryKeys.incorrect(category),
    queryFn: (cursor) =>
      getNotes({
        cursor,
        category: category ?? undefined,
      }),
    enabled,
  });
}
