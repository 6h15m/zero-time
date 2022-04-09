import React, { useRef } from "react";

export const useOffsetTop = (): [
  number,
  React.RefObject<HTMLDivElement> | null,
] => {
  const ref = useRef<HTMLDivElement | null>(null);

  let offsetTop = 0;
  if (ref.current)
    offsetTop =
      ref.current.getBoundingClientRect().top +
      document.documentElement.scrollTop;

  return [offsetTop, ref];
};
