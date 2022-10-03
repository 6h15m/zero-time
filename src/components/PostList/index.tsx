import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Link } from "gatsby";
import { Title } from "../Title";
import { Divider } from "../Divider";
import { TagList } from "../TagList";

const PostListWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const PostWrapper = styled.div`
  position: relative;
  top: 0;
  transition: all 0.5s;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const Date = styled.p`
  margin-bottom: 16px;
  font-size: 14.4px;
  color: ${(props) => props.theme.colors.tertiary};
`;

const Excerpt = styled.p`
  margin-bottom: 20px;
  line-height: 1.7;
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondary};
  word-break: break-all;
`;

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  );
};

type Tag = {
  fieldValue: string;
  totalCount: number;
};

type Post = {
  frontmatter: {
    title: string;
    date: string;
    tags: Array<Tag>;
    description: string | null;
  };
  fields: {
    slug: string;
  };
};

type Props = {
  postList: Array<Post>;
};

export const PostList = ({ postList }: Props) => {
  const [postCount, setPostCount] = useState(10);

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300);
    }
  }, 250);

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad);

    return () => {
      window.removeEventListener("scroll", handleMoreLoad);
    };
  }, [postCount, postList]);

  useEffect(() => {
    setPostCount(10);
  }, [postList]);

  return (
    <PostListWrapper>
      {postList.slice(0, postCount).map((post, i) => {
        const { title, date, tags, description } = post.frontmatter;
        const { slug } = post.fields;

        return (
          <>
            <PostWrapper>
              <Title size="md" to={slug} title={title} />
              <Date>{date}</Date>
              <Excerpt>{description}</Excerpt>
              <TagList tagList={tags} />
            </PostWrapper>

            {postCount - 1 !== i && postList.length - 1 !== i && (
              <Divider mt="20px" mb="20px" />
            )}
          </>
        );
      })}
    </PostListWrapper>
  );
};
