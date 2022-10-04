import type { ReactNode } from "react";
import { useMemo } from "react";
import { useScroll } from "../hooks";

type Props = {
  revealAt: number;
  reverse?: boolean;
  children: ReactNode;
};

export const RevealOnScroll = ({
  revealAt,
  reverse = false,
  children,
}: Props) => {
  const { y } = useScroll();
  const reveal = useMemo(
    () => (reverse ? y < revealAt : y > revealAt),
    [revealAt, y],
  );

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
