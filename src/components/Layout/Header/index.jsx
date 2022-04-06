import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Link } from "gatsby";

import { siteUrl } from "../../../../blog-config";

import {
  FaSun,
  FaMoon,
  FaTags,
  FaRss,
  FaSearch,
  FaListUl,
} from "react-icons/fa";

const HeaderWrapper = styled.header`
  display: block;
  position: fixed;
  top: ${(props) => (props.isHidden ? -60 : 0)}px;
  left: 0;
  right: 0;
  padding: 16px;
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transition: top 0.5s, opacity 0.5s;
  z-index: 999;

  @media (max-width: 768px) {
    padding: 16px 16px;
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 680px;
  margin: 0 auto;
`;

const BlogLogo = styled.img`
  width: 32px;
  height: 32px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    cursor: pointer;
  }

  & svg path {
    fill: ${(props) => props.theme.colors.icon};
    transition: fill 0.3s;
  }

  & svg:hover path {
    fill: ${(props) => props.theme.colors.text};
  }
`;

const ToggleWrapper = styled.div`
  width: 20px;
  height: 24px;
  margin-right: 15px;
  overflow: hidden;
  box-sizing: border-box;
`;

const IconRail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
  top: ${(props) => (props.theme === "light" ? "-19px" : "0px")};
  transition: top 0.4s;

  & > svg {
    transition: opacity 0.25s;
  }

  & > svg:first-child {
    opacity: ${(props) => (props.theme === "light" ? 0 : 1)};
  }

  & > svg:last-child {
    opacity: ${(props) => (props.theme === "dark" ? 0 : 1)};
  }
`;

const profileImageRoot =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteUrl;

const Header = ({ toggleTheme }) => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState();
  const [hidden, setHidden] = useState(false);

  const detectScrollDirection = () => {
    if (scrollY >= window.scrollY) {
      // scroll up
      setHidden(false);
    } else if (scrollY < window.scrollY && 400 <= window.scrollY) {
      // scroll down
      setHidden(true);
    }

    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", detectScrollDirection);

    return () => {
      window.removeEventListener("scroll", detectScrollDirection);
    };
  }, [scrollY]);

  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);

  return (
    <HeaderWrapper isHidden={hidden}>
      <Inner>
        <Link to="/">
          <BlogLogo src={`${profileImageRoot}/favicon.png`} alt="logo" />
        </Link>
        <Menu>
          <ToggleWrapper>
            <IconRail theme={theme.name}>
              <FaSun onClick={toggleTheme} />
              <FaMoon onClick={toggleTheme} />
            </IconRail>
          </ToggleWrapper>
          <Link to="/tags">
            <FaTags />
          </Link>
          <Link to="/series">
            <FaListUl />
          </Link>
          <Link to="/search">
            <FaSearch style={{ marginRight: 0 }} />
          </Link>
        </Menu>
      </Inner>
    </HeaderWrapper>
  );
};

export default Header;
