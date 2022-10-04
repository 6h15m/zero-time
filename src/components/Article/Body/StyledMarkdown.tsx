import styled from "styled-components";

export const StyledMarkdown = styled.div`
  & {
    font-size: 17.6px;
    color: ${(props) => props.theme.colors.primary};
    line-height: 2;
    overflow: hidden;
  }

  & del {
    opacity: 40%;
  }

  & *:first-child {
    margin-top: 0;
  }

  & table {
    text-align: center;
    word-break: keep-all;
  }

  & > p,
  & > ul,
  & > ol,
  & table,
  & blockquote,
  & pre,
  & img,
  & .katex-display {
    margin-top: 0;
    margin-bottom: 24px;
  }

  & p {
    overflow-x: scroll;
    word-break: break-all;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin: 11.2px 0 4.8px 0;
    font-weight: 700;
  }

  & h2 {
    margin-top: 64px;
    margin-bottom: 24px;
    font-size: 28px;
  }

  & h3 {
    margin-top: 48px;
    margin-bottom: 24px;
    font-size: 22.4px;
  }

  & h4 {
    margin-top: 32px;
    margin-bottom: 24px;
    font-size: 17.6px;
  }

  & h5 {
    font-size: 16px;
  }

  & h6 {
    font-size: 14.4px;
  }

  & strong {
    font-weight: 700;
  }

  & em {
    font-style: italic;
  }

  & blockquote {
    padding: 18px 24px;
    border-left: 4px solid ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.background};

    & *:last-child {
      margin-bottom: 0;
    }
  }

  & blockquote blockquote {
    margin-top: 24px;
  }

  & table {
    border: 1px solid ${(props) => props.theme.colors.primary};
    border-collapse: collapse;
  }

  & th {
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
    font-weight: 700;
  }

  & td {
    border-top: 1px solid ${(props) => props.theme.colors.primary};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }

  & td,
  th {
    padding: 8px;
  }

  & tr:first-child td {
    border-top: none;
  }

  & tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.background};
  }

  & tr:last-child td {
    border-bottom: none;
  }

  & p > code {
    word-break: break-all;
  }

  & code.language-text {
    padding: 1.6px 4.8px;
    font-size: 14.4px;
    background-image: none;
    background-color: ${(props) => props.theme.colors.quaternary};
    font-weight: 500;
    color: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 1.5px;
    box-shadow: none;
  }

  & a > code.language-text:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.quaternary};
    border-radius: 1.5px;
  }

  & ul,
  & ol {
    padding-left: 32px;
  }

  & ol {
    list-style: decimal;
  }

  & ul {
    list-style: disc;
  }

  & ul ul {
    list-style: circle;
  }

  & ul ul ul {
    list-style: square;
  }

  & li {
    margin-bottom: 12.8px;
  }

  & li p {
    margin-top: 8px;
  }

  & pre {
    ::-webkit-scrollbar {
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: ${(props) => props.theme.colors.scrollTrack};
    }

    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.colors.scrollHandle};
    }
  }

  & pre > code {
    font-size: 14.4px;
  }

  & img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }

  & figcaption {
    margin-top: 5px;
    text-align: center;
    color: #868e96;
    font-size: 12px;
    font-style: italic;
  }

  & hr {
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }

  & a {
    padding: 0;
    color: ${(props) => props.theme.colors.primary};
  }

  & a:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
    border-radius: 1.5px;
  }
`;
