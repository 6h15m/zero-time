import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import "./prism.css";
import "katex/dist/katex.min.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return <>{element}</>;
};
