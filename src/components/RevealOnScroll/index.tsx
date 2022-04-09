import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { useScroll } from "../../hooks";

type StyledWrapperProps = {
  visible: boolean;
};

const StyledWrapper = styled.div<StyledWrapperProps>`
  position: relative;
  opacity: 0;
  transition: 0.35s all ease;
  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
    `}
`;

type Props = {
  revealAt: number;
  reverse: boolean;
  children: ReactNode;
};

export const RevealOnScroll = ({ revealAt, reverse, children }: Props) => {
  const { y } = useScroll();

  let reveal = null;
  if (!reverse) reveal = y > revealAt;
  else reveal = y < revealAt;

  return <StyledWrapper visible={reveal}>{children}</StyledWrapper>;
};
