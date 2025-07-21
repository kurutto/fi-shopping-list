import { useCallback } from "react";
import { Swiper } from "swiper/types";

const MIN_SWIPE_DISTANCE = 30;

export const useSwiper = (
  handleSwipeLeft: () => void,
  handleSwipeRight: () => void
) => {
  const handleTouchEnd = useCallback(
    (event: Swiper) => {
      const diff = event.touches.diff;
      if (Math.abs(diff) < MIN_SWIPE_DISTANCE) return;

      // スワイプ左右の確認
      if (diff < 0) {
        handleSwipeLeft();
      } else {
        handleSwipeRight();
      }
    },
    [handleSwipeLeft, handleSwipeRight]
  );

  return { handleTouchEnd };
};
