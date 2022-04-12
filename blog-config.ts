import { UtterancesProps } from "utterances-react-component";

type BlogConfig = {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
  links: {
    github: string;
    linkedIn: string;
    email: string;
  };
  utterances: UtterancesProps;
};

const blogConfig: BlogConfig = {
  title: "영의 시간",
  description: "Web Front-end Developer ´◡`",
  author: "Zero",
  siteUrl: "https://6h15m.github.io",
  links: {
    github: "https://github.com/6h15m",
    linkedIn:
      "https://www.linkedin.com/in/%EC%98%88%EC%84%9C-%EC%9D%B4-9b0a3a213/",
    email: "mailto:mkitwave@gmail.com",
  },
  utterances: {
    repo: "6h15m/6h15m.github.io",
    issueTerm: "pathname",
    theme: "github-light",
  },
};

export default blogConfig;
