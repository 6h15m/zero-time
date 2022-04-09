import React, { ReactNode } from "react";
import styled from "styled-components";

const BodyWrapper = styled.div`
  margin: 0 auto;
  padding-top: 80px;
  max-width: 680px;
`;

type Props = {
  children: ReactNode;
};

const Body = ({ children }: Props) => {
  return <BodyWrapper>{children}</BodyWrapper>;
};

export default Body;
