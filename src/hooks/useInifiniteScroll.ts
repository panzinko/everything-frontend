import { useCallback, useEffect, useRef } from 'react';

const ROOT_MARGIN = '100px';

export function useInfiniteScroll(onIntersect: () => void, enabled = true, threshold = 0.5) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const setTargetRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (targetRef.current && observerRef.current) {
        observerRef.current.unobserve(targetRef.current);
      }

      targetRef.current = node;

      if (node && enabled && observerRef.current) {
        observerRef.current.observe(node);
      }
    },
    [enabled],
  );

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && enabled) {
          onIntersect();
        }
      },
      { threshold, rootMargin: ROOT_MARGIN },
    );

    if (targetRef.current && enabled) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onIntersect, threshold, enabled]);

  return setTargetRef;
}
