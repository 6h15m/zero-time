import type { ReactNode } from "react";
import { useScroll } from "../hooks";

type Props = {
  revealAt: number;
  reverse: boolean;
  children: ReactNode;
};

export const RevealOnScroll = ({ revealAt, reverse, children }: Props) => {
  const { y } = useScroll();

  let reveal: boolean;
  if (!reverse) reveal = y > revealAt;
  else reveal = y < revealAt;

  return (
    <div
      className={`relative transition-[0.35s_all_ease] ${
        reveal ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};
