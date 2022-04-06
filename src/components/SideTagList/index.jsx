import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { Link } from "gatsby";
import { FiTag } from "react-icons/fi";

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
    stroke: ${(props) => props.theme.colors.icon};
  }

  & svg path {
    transition: fill 0.3s;
  }

  & svg:hover path {
    stroke: ${(props) => props.theme.colors.text};
  }

  @media (max-width: 1300px) {
    display: none;
  }
`;

const Tag = styled.li`
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.tertiaryText};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
`;

const SideTagList = ({ tags, postCount }) => {
  return (
    <RelativeWrapper>
      <Wrapper>
        <FiTag />
        <ul>
          <Tag>
            <Link to="/tags"># All</Link>
          </Tag>
          {_.map(tags, (tag) => (
            <Tag>
              <Link to={`/tags?q=${tag.fieldValue}`}># {tag.fieldValue}</Link>
            </Tag>
          ))}
        </ul>
      </Wrapper>
    </RelativeWrapper>
  );
};

export default SideTagList;
