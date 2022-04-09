import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { spaceToDash } from "../../utils";

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
type Tag =
  | {
      fieldValue: string;
      totalCount: number;
    }
  | string;

type Props = {
  tagList: Array<Tag>;
  count?: boolean;
  selected?: string;
};

export const TagList = ({ tagList, count, selected }: Props) => {
  if (!tagList) return null;

  if (!count) {
    return (
      <TagListWrapper>
        {tagList.map((tag, i) => {
          const tagName = typeof tag === "object" ? tag.fieldValue : tag;
          return (
            <Link
              key={JSON.stringify({ tag, i })}
              to={`/tags?q=${spaceToDash(tagName)}`}
            >
              <TagLink># {tagName}</TagLink>
            </Link>
          );
        })}
      </TagListWrapper>
    );
  }

  return (
    <TagListWrapper>
      {tagList.map((tag, i) => {
        const tagName = typeof tag === "object" ? tag.fieldValue : tag;
        const tagAmount = typeof tag === "object" ? tag.totalCount : tag;
        return (
          <Link
            key={JSON.stringify({ tag, i })}
            to={
              selected === tagName ? "/tags" : `/tags?q=${spaceToDash(tagName)}`
            }
          >
            <TagLink selected={tagName === selected}>
              # {tagName} {tagAmount && `(${tagAmount})`}
            </TagLink>
          </Link>
        );
      })}
    </TagListWrapper>
  );
};
