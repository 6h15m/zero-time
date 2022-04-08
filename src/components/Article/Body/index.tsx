import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useOffsetTop from "../../../hooks/useOffsetTop";
import Toc from "./Toc";
import { StyledMarkdown } from "./StyledMarkdown";

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

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
    <Wrapper>
      <Toc items={toc} articleOffset={offsetTop} />

      <StyledMarkdown
        id="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
        ref={ref}
      />
    </Wrapper>
  );
};

export default Body;
