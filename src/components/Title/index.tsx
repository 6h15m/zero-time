import React, { ReactNode } from "react";
import styled from "styled-components";

type WrapperProps = {
  size: string;
};

const Wrapper = styled.h1<WrapperProps>`
  margin-bottom: 12px;
  font-size: ${(props) => props.size};
  font-weight: 700;
  line-height: 1.3;
  color: ${(props) => props.theme.colors.primary};
  word-break: break-all;

  & > a {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
  }

  & > a:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

type Props = {
  size: "sm" | "md" | "bg";
  children: ReactNode;
};

export const Title = ({ size, children }: Props) => {
  const sizes = {
    sm: "19.2px",
    md: "25.6px",
    bg: "33.6px",
  };

  return <Wrapper size={sizes[size]}> {children} </Wrapper>;
};
