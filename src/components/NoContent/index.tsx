import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 150px;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.tertiaryText};
`;

type Props = {
  name: string;
};

export const NoContent = ({ name }: Props) => (
  <Wrapper>There is no {name}.</Wrapper>
);
