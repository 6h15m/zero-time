import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "katex/dist/katex.min.css";
import "../../styles/prism.css";
import "../../fonts/typography.css";
import type { Theme } from "../../assets/theme";

type Props = {
  theme: Theme;
};

export const GlobalStyles = createGlobalStyle<Props>`
  ${reset}

  body {
    :lang(ko) { h1, h2, h3 { word-break: keep-all; } }
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    background: ${(props) => props.theme.colors.background};
  }

`;
