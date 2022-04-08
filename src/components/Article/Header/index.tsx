import React from "react";
import styled from "styled-components";
import BlogConfig from "../../../../blog-config";
import { Divider } from "../../Divider";
import { TagList } from "../../TagList";

const Wrapper = styled.div`
  margin-top: 32px;
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const ArticleTitle = styled.h1`
  margin-bottom: 25.6px;
  line-height: 1.2;
  font-size: 44.8px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
`;

const Information = styled.div`
  margin-bottom: 32px;
  font-size: 16px;
`;

const Author = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
`;

const Date = styled.span`
  font-weight: 300;
  color: ${(props) => props.theme.colors.secondary};
`;

type Tag = {
  fieldValue: string;
  totalCount: number;
};

type Props = {
  title: string;
  date: string;
  tags: Array<Tag>;
  minToRead: number;
};

export const Header = ({ title, date, tags, minToRead }: Props) => {
  return (
    <Wrapper>
      <ArticleTitle> {title} </ArticleTitle>
      <Information>
        <Author> {BlogConfig.author} </Author>
        <Date>· {date} </Date>
        <Date>· {minToRead} min read </Date>
      </Information>
      {tags && <TagList tagList={tags} />}
      <Divider mt="0" />
    </Wrapper>
  );
};
