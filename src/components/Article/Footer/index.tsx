import React, { ReactNode } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { Utterances } from "utterances-react-component";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import BlogConfig from "../../../../blog-config";
import { Bio } from "../../Bio";
import { Divider } from "../../Divider";

const ArticleButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    margin-bottom: 80px;
    padding: 0 12.8px;
    flex-direction: column;

    & > div:first-child {
      margin-bottom: 12.8px;
    }
  }
`;

const ArrowFlexWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const ArticleButtonTextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  overflow: hidden;
`;

const Arrow = styled.div`
  position: relative;
  left: 0;
  display: flex;
  align-items: center;
  font-size: 24px;
  flex-basis: 24px;
  transition: left 0.3s;
`;

type ArticleButtonProps = {
  right?: boolean;
  children: ReactNode;
  onClick: () => void;
};

const ArticleButtonWrapper = styled.div<ArticleButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.right ? "flex-end" : "flex-start")};
  padding: 20.8px 16px;
  max-width: 250px;
  flex-basis: 250px;
  font-size: 16px;
  border: solid 1px ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.background};
  }

  & ${ArrowFlexWrapper} {
    flex-direction: ${(props) => (props.right ? "row-reverse" : "row")};
  }

  & ${ArticleButtonTextWrapper} {
    align-items: ${(props) => (props.right ? "flex-end" : "flex-start")};
  }

  & ${Arrow} {
    ${(props) => (props.right ? "margin-left: 16px" : "margin-right: 16px")};
  }

  &:hover ${Arrow} {
    left: ${(props) => (props.right ? 2 : -2)}px;
  }

  @media (max-width: 768px) {
    max-width: inherit;
    flex-basis: inherit;
  }
`;

const ArticleButtonLabel = styled.div`
  margin-bottom: 9.6px;
  font-size: 12.8px;
`;

const ArticleButtonTitle = styled.div`
  padding: 2px 0;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CommentWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const ArticleButton = ({ right, children, onClick }: ArticleButtonProps) => {
  return (
    <ArticleButtonWrapper right={right} onClick={onClick}>
      <ArrowFlexWrapper>
        <Arrow>{right ? <BiRightArrowAlt /> : <BiLeftArrowAlt />}</Arrow>
        <ArticleButtonTextWrapper>
          <ArticleButtonLabel>
            {right ? <>Next Post</> : <>Previous Post</>}
          </ArticleButtonLabel>
          <ArticleButtonTitle>{children}</ArticleButtonTitle>
        </ArticleButtonTextWrapper>
      </ArrowFlexWrapper>
    </ArticleButtonWrapper>
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
    <>
      <ArticleButtonContainer>
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
      </ArticleButtonContainer>
      <Bio />
      <CommentWrapper>
        <Divider mt="32px" />
        <Comment />
      </CommentWrapper>
    </>
  );
};
