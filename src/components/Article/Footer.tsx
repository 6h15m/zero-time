import type { ReactNode } from "react";
import { navigate } from "gatsby";
import { Utterances } from "utterances-react-component";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import BlogConfig from "../../../blog-config";
import { Bio } from "../Bio";
import { Divider } from "../Divider";

type ArticleButtonProps = {
  right?: boolean;
  children: ReactNode;
  onClick: () => void;
};

const ArticleButton = ({ right, children, onClick }: ArticleButtonProps) => {
  return (
    <button
      className={`group flex flex-col px-3 py-4 border border-black transition-colors hover:text-white hover:bg-black ${
        right ? "items-end" : "items-start"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-full flex items-center whitespace-nowrap ${
          right ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`relative left-0 flex items-center transition ${
            right ? "ml-4 group-hover:left-px" : "mr-4 group-hover:-left-px"
          }`}
        >
          {right ? <BiRightArrowAlt /> : <BiLeftArrowAlt />}
        </div>
        <div
          className={`flex flex-col gap-y-2 ${
            right ? "items-end" : "items-start"
          }`}
        >
          <div className="text-xs">
            {right ? <>Next Post</> : <>Previous Post</>}
          </div>
          <div className="truncate w-full">{children}</div>
        </div>
      </div>
    </button>
  );
};

const Comment = () => {
  // @TODO: theme 변경 로직
  return <Utterances {...BlogConfig.utterances} />;
};

type Article = {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
};

type Props = {
  previous: Article;
  next: Article;
};

export const Footer = ({ previous, next }: Props) => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col justify-between xl:flex-row gap-y-1">
        {previous ? (
          <ArticleButton onClick={() => navigate(previous?.fields?.slug)}>
            {previous?.frontmatter?.title}
          </ArticleButton>
        ) : (
          <></>
        )}
        {next && (
          <ArticleButton right onClick={() => navigate(next?.fields?.slug)}>
            {next?.frontmatter?.title}
          </ArticleButton>
        )}
      </div>
      <Bio />
      <Divider />
      <Comment />
    </div>
  );
};
