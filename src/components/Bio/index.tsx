import React, { ReactNode } from "react";
import { FiGithub, FiLinkedin, FiMail, FiUser } from "react-icons/fi";
import BlogConfig from "../../../blog-config";

type LinkProps = {
  link: string;
  children: ReactNode;
};

const Link = ({ link, children }: LinkProps) => {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export const Bio = () => {
  const { github, linkedIn, email } = BlogConfig.links;

  return (
    <div className="gap-y-2 flex flex-col">
      <div className="text-2xl font-bold mb-2.5">{BlogConfig.author}</div>
      <div className="leading-6 text-zinc-800">{BlogConfig.description}</div>
      <div className="flex gap-x-2">
        <Link link={github}>
          <FiGithub className="w-6 h-6 stroke-1" />
        </Link>
        <Link link={linkedIn}>
          <FiLinkedin className="w-6 h-6 stroke-1" />
        </Link>
        <Link link={email}>
          <FiMail className="w-6 h-6 stroke-1" />
        </Link>
        <a href="/resume">
          <FiUser className="w-6 h-6 stroke-1" />
        </a>
      </div>
    </div>
  );
};
