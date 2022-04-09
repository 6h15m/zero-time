import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { Link } from "gatsby";
import { FiTag } from "react-icons/fi";
import { spaceToDash } from "../../utils";

const RelativeWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.aside`
  position: absolute;
  left: 112%;
  top: 0px;
  width: 200px;
  height: 100px;
  font-size: 12px;

  & svg {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    margin-bottom: 20px;
    cursor: pointer;
    stroke-width: 1px;
    stroke: ${(props) => props.theme.colors.primary};
  }

  & svg path {
    transition: fill 0.3s;
  }

  & svg:hover path {
    stroke: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 1300px) {
    display: none;
  }
`;

const Tag = styled.li`
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.tertiary};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
`;

type Tag =
  | {
      fieldValue: string;
      totalCount: number;
    }
  | string;

type Props = {
  tags: Array<Tag>;
};

export const SideTagList = ({ tags }: Props) => {
  return (
    <RelativeWrapper>
      <Wrapper>
        <Link to="/tags">
          <FiTag />
        </Link>
        <ul>
          <Tag>
            <Link to="/tags"># All</Link>
          </Tag>
          {_.map(tags, (tag) => {
            const tagName = typeof tag === "object" ? tag.fieldValue : tag;
            return (
              <Tag>
                <Link to={`/tags?q=${spaceToDash(tagName)}`}># {tagName}</Link>
              </Tag>
            );
          })}
        </ul>
      </Wrapper>
    </RelativeWrapper>
  );
};
