import { useEffect, useMemo, useState } from "react";
import { map, pipe, toArray } from "@fxts/core";
import { animateScroll } from "react-scroll";
import { useScroll } from "../../../hooks";
import { getElementOffset } from "../../../utils";
import { RevealOnScroll } from "../../RevealOnScroll";

const STICK_OFFSET = 80;

type Item = {
  tagName: string;
  innerText: string;
};

type Props = {
  items: Array<Item>;
  articleOffset: number;
};

export const Toc = ({ items, articleOffset }: Props) => {
  const { y } = useScroll();

  const [revealAt, setRevealAt] = useState(4000);
  const [headers, setHeaders] = useState<Array<number>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const bioElm: HTMLElement | null = document.getElementById("bio");

    bioElm &&
      setRevealAt(
        getElementOffset(bioElm).top +
          bioElm.getBoundingClientRect().height -
          400,
      );
  }, []);

  useEffect(() => {
    setHeaders(
      pipe(
        document.querySelectorAll(
          "#article-body > h2, #article-body > h3",
        ) as unknown as Array<HTMLElement>,
        map((element) => getElementOffset(element).top),
        toArray,
      ),
    );
  }, []);

  useEffect(() => {
    headers.forEach((header, i) => {
      if (header - 300 < y) {
        setActive(i);
        return;
      }
    });
  }, [y]);

  const handleClickTitle = (index: number) => {
    animateScroll.scrollTo(headers[index] - 100);
  };

  const stick = useMemo(
    () => y > articleOffset - STICK_OFFSET,
    [y, articleOffset],
  );

  return (
    <RevealOnScroll revealAt={revealAt} reverse>
      <div className="absolute left-[100%] text-sm xl:block hidden w-full">
        <ul
          className={`${
            stick ? "fixed" : "relative"
          }  h-[30rem] w-full overflow-y-auto shrink-0 flex flex-col gap-y-3 pl-10`}
          style={{ top: stick ? STICK_OFFSET + "px" : undefined }}
        >
          {items.map((item, i) => (
            <button
              key={"toc-" + i}
              className={`w-fit hover:text-black transition-all ${
                i === active
                  ? "text-zinc-800 font-semibold"
                  : "translate-x-1 text-zinc-600"
              } ${item.tagName === "H3" ? "pl-4" : ""}`}
              onClick={() => handleClickTitle(i)}
            >
              {item.innerText}
            </button>
          ))}
        </ul>
      </div>
    </RevealOnScroll>
  );
};
