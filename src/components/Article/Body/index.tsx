import { useEffect, useState } from "react";
import { useOffsetTop } from "../../../hooks";
import { Toc } from "./Toc";
import { StyledMarkdown } from "./StyledMarkdown";

type Props = {
  html: string;
};

export const Body = ({ html }: Props) => {
  const [toc, setToc] = useState([]);
  const [offsetTop, ref] = useOffsetTop();

  useEffect(() => {
    setToc(
      Array.from(
        document.querySelectorAll("#article-body > h2, #article-body > h3"),
      ),
    );
  }, []);

  return (
    <>
      <Toc items={toc} articleOffset={offsetTop} />
      <StyledMarkdown
        id="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
        ref={ref}
      />
    </>
  );
};

export default Body;
