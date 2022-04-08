import React from "react";
import styled from "styled-components";
import BlogConfig from "../../../../blog-config";

const FooterWrapper = styled.footer`
  margin-top: 32px;
  padding: 40px 0;
  text-align: center;
  font-size: 9pt;
  font-weight: lighter;
  color: ${(props) => props.theme.colors.secondary};

  & > a {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      © {BlogConfig.title}, Inspired by{" "}
      <a href="https://github.com/devHudi/gatsby-starter-hoodie" target="blank">
        gatsby-starter-hoodie
      </a>
      .
    </FooterWrapper>
  );
};

export default Footer;
