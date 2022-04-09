import styled from "styled-components";

type Props = {
  mt?: string;
  mb?: string;
};

export const Divider = styled.hr<Props>`
  margin-top: ${(props) => props.mt};
  margin-bottom: ${(props) => props.mb};
  border: none;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
`;
