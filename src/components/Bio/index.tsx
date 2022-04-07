import React from "react";
import styled from "styled-components";

import {
  FiGithub,
  FiFacebook,
  FiLinkedin,
  FiInstagram,
  FiLink,
  FiMail,
  FiUser,
} from "react-icons/fi";

import { description, author, links } from "../../../blog-config";

const BioWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const Author = styled.div`
  margin-bottom: 4.8px;
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

const Description = styled.div`
  margin-bottom: 14px;
  line-height: 1.5;
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondaryText};
`;

const LinksWrapper = styled.div`
  & a {
    margin-right: 9.6px;
  }

  & svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
    stroke-width: 1px;
    stroke: ${(props) => props.theme.colors.icon};
  }

  & svg path {
    transition: fill 0.3s;
  }
`;

const Link = ({ link, children }) => {
  if (!link) return null;
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

const Bio = () => {
  const { github, instagram, facebook, linkedIn, email, etc } = links;

  return (
    <BioWrapper id="bio">
      <div>
        <Author>{author}</Author>
        <Description>{description}</Description>
        <LinksWrapper>
          <Link link={github}>
            <FiGithub />
          </Link>
          <Link link={instagram}>
            <FiInstagram />
          </Link>
          <Link link={facebook}>
            <FiFacebook />
          </Link>
          <Link link={linkedIn}>
            <FiLinkedin />
          </Link>
          <Link link={email}>
            <FiMail />
          </Link>
          <Link link={etc}>
            <FiLink />
          </Link>
          <Link link="./resume">
            <FiUser />
          </Link>
        </LinksWrapper>
      </div>
    </BioWrapper>
  );
};

export default Bio;
