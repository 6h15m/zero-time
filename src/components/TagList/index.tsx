import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const TagListWrapper = styled.div`
  margin-bottom: 16px;
  word-break: break-all;
`;

type TagLinkProps = {
  selected?: boolean;
};

const TagLink = styled.div<TagLinkProps>`
  display: inline-block;
  padding: 8px 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.primary
      : props.theme.colors.background};
  color: ${(props) =>
    props.selected
      ? props.theme.colors.background
      : props.theme.colors.primary};
  text-decoration: none;
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.selected
        ? props.theme.colors.primary
        : props.theme.colors.background};

    color: ${(props) => props.theme.colors.secondary};
  }
`;

const spaceToDash = (text: string) => {
  return text.replace(/\s+/g, "-");
};

type Tag = {
  fieldValue: string;
  totalCount: number;
};

type Props = {
  tagList: Array<Tag>;
  count?: number;
  selected?: string;
  onClick?: () => void;
};

export const TagList = ({ tagList, count, selected, onClick }: Props) => {
  if (!tagList) return null;

  if (!count) {
    return (
      <TagListWrapper>
        {tagList.map((tag, i) => (
          <Link
            key={JSON.stringify({ tag, i })}
            to={`/tags?q=${tag.fieldValue}`}
          >
            <TagLink># {spaceToDash(tag.fieldValue)}</TagLink>
          </Link>
        ))}
      </TagListWrapper>
    );
  }

  return (
    <TagListWrapper onClick={onClick}>
      {tagList.map((tag, i) => (
        <Link
          key={JSON.stringify({ tag, i })}
          to={
            selected === tag.fieldValue ? "/tags" : `/tags?q=${tag.fieldValue}`
          }
        >
          <TagLink selected={tag.fieldValue === selected}>
            {spaceToDash(tag.fieldValue)} ({tag.totalCount})
          </TagLink>
        </Link>
      ))}
    </TagListWrapper>
  );
};
