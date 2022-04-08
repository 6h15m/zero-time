import styled from "styled-components";

type Props = {
  size: number;
};

export const VerticalSpace = styled.div<Props>`
  height: ${(props) => props.size}px;
`;
