import React, { useEffect, useState } from "react";
import { graphql, navigate } from "gatsby";
import { filter, pipe, reverse, sortBy, toArray } from "@fxts/core";
import queryString from "query-string";
import styled from "styled-components";
import BlogConfig from "../../blog-config";
import { SEO, Layout, TagList, PostList, VerticalSpace } from "../components";

type Tag = {
  fieldValue: string;
  totalCount: number;
};

type Frontmatter = {
  date: string;
  update: string;
  title: string;
  tags: Array<Tag>;
  description: string | null;
};

type MarkDownRemarkGroupConnection = {
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: Frontmatter;
  rawMarkdownBody: string;
};

type PageQueryResult = {
  allMarkdownRemark: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>;
    nodes: Array<MarkDownRemarkGroupConnection>;
  };
};

type Props = {
  data: PageQueryResult;
};

const TagListWrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const TagsPage = ({ data }: Props) => {
  const tags = pipe(
    data.allMarkdownRemark.group,
    sortBy((group) => group.totalCount),
    reverse,
    toArray,
  );
  const posts = data.allMarkdownRemark.nodes;

  const [selected, setSelected] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<
    Array<MarkDownRemarkGroupConnection>
  >([]);

  let query: string = "";
  if (typeof document !== "undefined") {
    query = document.location.search;
  }

  useEffect(() => {
    if (!selected) {
      setFilteredPosts(posts);
      return;
    }

    setFilteredPosts(
      pipe(
        posts,
        filter(
          (post) =>
            post.frontmatter.tags.indexOf(selected as unknown as Tag) !== -1,
        ),
        toArray,
      ),
    );
  }, [selected]);

  useEffect(() => {
    const q = queryString.parse(query)["q"] as string;
    setSelected(q);
  }, [query]);

  return (
    <Layout>
      <SEO
        title={BlogConfig.title}
        description={BlogConfig.description}
        url={BlogConfig.siteUrl}
      />

      <TagListWrapper>
        <TagList
          count
          tagList={tags}
          selected={selected}
          onClick={(tag: string) => {
            if (tag === selected) {
              navigate("/tags");
            } else setSelected(tag);
          }}
        />
      </TagListWrapper>

      <VerticalSpace size={32} />

      <PostList postList={filteredPosts} />
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          update(formatString: "YYYY.MM.DD")
          title
          tags
          description
        }
      }
    }
  }
`;
