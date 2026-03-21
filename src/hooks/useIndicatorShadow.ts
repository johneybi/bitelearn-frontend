import { useEffect, useRef, useState } from 'react';

const BOTTOM_THRESHOLD_PX = 1;

export default function useIndicatorShadow<T extends HTMLElement>() {
  const scrollRef = useRef<T>(null);
  const updateShadowStateRef = useRef<() => void>(() => {});
  const [showIndicatorShadow, setShowIndicatorShadow] = useState(false);

  // 챕터 인디케이터에 그림자 효과 적용
  useEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    // 스크롤, 리사이즈, DOM 변경 시 그림자 상태 업데이트
    const updateShadowState = () => {
      const canScroll =
        element.scrollHeight - element.clientHeight > BOTTOM_THRESHOLD_PX;
      const isAtBottom =
        element.scrollTop + element.clientHeight >=
        element.scrollHeight - BOTTOM_THRESHOLD_PX;

      setShowIndicatorShadow(canScroll && !isAtBottom);
    };

    // Ref에 업데이트 함수를 저장하여 이벤트 리스너에서 최신 상태로 접근할 수 있도록 함
    updateShadowStateRef.current = updateShadowState;
    updateShadowState();

    // 스크롤, 리사이즈, DOM 변경 이벤트에 업데이트 함수 등록
    element.addEventListener('scroll', updateShadowState, { passive: true });

    // ResizeObserver와 MutationObserver를 사용하여 요소의 크기 변경과 DOM 변경을 감지
    const resizeObserver = new ResizeObserver(updateShadowState);
    resizeObserver.observe(element);

    // DOM 변경 감지를 위해 MutationObserver 추가
    const mutationObserver = new MutationObserver(updateShadowState);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // 윈도우 리사이즈 이벤트에도 업데이트 함수 등록
    window.addEventListener('resize', updateShadowState);

    // 컴포넌트 언마운트 시 이벤트 리스너와 옵저버 정리
    return () => {
      element.removeEventListener('scroll', updateShadowState);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', updateShadowState);
    };
  }, []);

  // 스크롤 위치 변경 시 애니메이션 프레임을 사용하여 그림자 상태 업데이트
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      updateShadowStateRef.current();
    });

    return () => window.cancelAnimationFrame(frameId);
  });

  return {
    scrollRef,
    showIndicatorShadow,
  };
}
