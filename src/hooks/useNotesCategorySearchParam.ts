import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Category } from '@/api/learning/learning.types';

type NoteCategoryOption = {
  category: Category;
  categoryName: string;
};

export default function useNotesCategorySearchParam(
  categories: NoteCategoryOption[]
) {
  // notes 페이지의 선택 카테고리를 URL 쿼리스트링과 동기화
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // 유효한 카테고리 값만 선택 상태로 인정하고, 그 외 값은 전체(null)로 처리
  const selectedCategory = categories.some(
    (category) => category.category === categoryParam
  )
    ? (categoryParam as Category)
    : null;

  const setSelectedCategory = useCallback(
    (category: Category | null) => {
      // 기존 searchParams를 유지한 채 category 값만 갱신
      const nextSearchParams = new URLSearchParams(searchParams);

      if (category) {
        nextSearchParams.set('category', category);
      } else {
        nextSearchParams.delete('category');
      }

      setSearchParams(nextSearchParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    selectedCategory,
    setSelectedCategory,
  };
}
