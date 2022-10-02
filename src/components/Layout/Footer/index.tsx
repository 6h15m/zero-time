import React from "react";
import BlogConfig from "../../../../blog-config";

const Footer = () => {
  return (
    <div className="text-zinc-700 text-center text-sm">
      © {BlogConfig.title}, Inspired by{" "}
      <a
        href="https://github.com/devHudi/gatsby-starter-hoodie"
        target="blank"
        className="underline"
      >
        gatsby-starter-hoodie
      </a>
      .
    </div>
  );
};

export default Footer;
