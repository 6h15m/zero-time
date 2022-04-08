import React, { ReactNode } from "react";
import styled from "styled-components";
import { FiGithub, FiLinkedin, FiMail, FiUser } from "react-icons/fi";
import BlogConfig from "../../../blog-config";

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
  color: ${(props) => props.theme.colors.primary};
`;

const Description = styled.div`
  margin-bottom: 14px;
  line-height: 1.5;
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondary};
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
    stroke: ${(props) => props.theme.colors.primary};
  }

  & svg path {
    transition: fill 0.3s;
  }
`;

type LinkProps = {
  link: string;
  children: ReactNode;
};

const Link = ({ link, children }: LinkProps) => {
  if (!link) return null;
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export const Bio = () => {
  const { github, linkedIn, email } = BlogConfig.links;

  return (
    <BioWrapper id="bio">
      <div>
        <Author>{BlogConfig.author}</Author>
        <Description>{BlogConfig.description}</Description>
        <LinksWrapper>
          <Link link={github}>
            <FiGithub />
          </Link>
          <Link link={linkedIn}>
            <FiLinkedin />
          </Link>
          <Link link={email}>
            <FiMail />
          </Link>
          <a href="./resume">
            <FiUser />
          </a>
        </LinksWrapper>
      </div>
    </BioWrapper>
  );
};
