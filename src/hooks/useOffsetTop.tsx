import { useRef } from "react";

const useOffsetTop = () => {
  const ref = useRef<HTMLElement>();

  let offsetTop = 0;
  if (ref.current)
    offsetTop =
      ref.current.getBoundingClientRect().top +
      document.documentElement.scrollTop;

  return [ref, offsetTop];
};

export default useOffsetTop;
