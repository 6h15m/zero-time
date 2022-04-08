import React, { useState, useMemo } from "react";
import _ from "lodash";
import styled from "styled-components";
import { Link } from "gatsby";
import { AiOutlineArrowLeft } from "react-icons/ai";

const SeriesWrapper = styled.div`
  margin-bottom: 32px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.primary};

  @media (max-width: 768px) {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const SeriesHeader = styled.h2`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};

  & > span {
    font-weight: normal;
    color: ${(props) => props.theme.colors.tertiary};
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }

  & > a:hover {
    text-decoration: underline;
  }
`;

const PostWrapper = styled.ul``;

type PostProps = {
  currentPost: boolean;
};

const Post = styled.li<PostProps>`
  position: relative;
  font-size: 12.8px;
  color: ${(props) =>
    props.currentPost
      ? props.theme.colors.primary
      : props.theme.colors.tertiary};

  &:not(:last-child) {
    margin-bottom: 9.6px;
  }

  & > a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s;
  }

  & > a:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  & > svg {
    position: absolute;
    margin-left: 5px;
  }
`;

const ViewMore = styled.div`
  margin-top: 15px;
  font-size: 14.4px;
  text-align: center;
  color: ${(props) => props.theme.colors.tertiary};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

type Series = {
  id: string;
  currentPost: boolean;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
};

type Props = {
  header: string;
  series: Array<Series>;
};

export const Series = ({ header, series }: Props) => {
  const [fold, setFold] = useState(true);

  const filteredPosts = useMemo(() => {
    if (series.length < 5) return series;
    if (!fold) return series;

    const currentPostIdx = _.findIndex(series, { currentPost: true });

    if (currentPostIdx < 2) return series.slice(0, 5);
    if (series.length - currentPostIdx - 1 < 2)
      return series.slice(series.length - 5, series.length);

    return series.slice(currentPostIdx - 2, currentPostIdx + 3);
  }, [series, fold]);

  const showViewButton = useMemo(() => {
    return series.length > 5;
  }, [series]);

  return (
    <SeriesWrapper>
      <SeriesHeader>
        <Link to={`/series/${_.replace(header, /\s/g, "-")}`}>{header}</Link>
      </SeriesHeader>
      <PostWrapper>
        {filteredPosts.map((post, i) => (
          <Post key={i} currentPost={post.currentPost}>
            <Link to={post.fields.slug}>{post.frontmatter.title}</Link>{" "}
            {post.currentPost && <AiOutlineArrowLeft />}{" "}
          </Post>
        ))}
      </PostWrapper>
      {showViewButton && (
        <ViewMore
          onClick={() => {
            setFold(!fold);
          }}
        >
          {fold
            ? `View More (+${series.length - filteredPosts.length})`
            : "View Less"}
        </ViewMore>
      )}
    </SeriesWrapper>
  );
};

export default Series;
