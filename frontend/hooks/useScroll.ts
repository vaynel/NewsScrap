import { useRef, useEffect } from "react";

export const useScroll = (loadMoreCallback: () => void) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (loadMoreRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;

        // 스크롤이 하단에 도달하면 더 많은 데이터를 불러옴
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          loadMoreCallback(); // 데이터 로딩 콜백 호출
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreCallback]);

  return {
    loadMoreRef,
  };
};
