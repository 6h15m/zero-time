import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import "./src/styles/prism.css";
import "./src/styles/global.css";
import "./src/fonts/typography.css";
import "katex/dist/katex.min.css";
import "./dist/output.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return <>{element}</>;
};
