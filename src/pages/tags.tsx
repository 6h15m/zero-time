import React, { useEffect, useState } from "react";
import _ from "lodash";
import { graphql, navigate } from "gatsby";
import { filter, pipe, toArray } from "@fxts/core";
import queryString from "query-string";
import styled from "styled-components";
import BlogConfig from "../../blog-config";
import { Layout, PostList, SEO, TagList, VerticalSpace } from "../components";

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
    group: Array<
      | {
          fieldValue: string;
          totalCount: number;
        }
      | string
    >;
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

const DashToSpace = (text: string) => {
  return text.replace(`-`, " ");
};

const TagsPage = ({ data }: Props) => {
  const tags = _.sortBy(data.allMarkdownRemark.group, ["totalCount"]).reverse();
  const posts = data.allMarkdownRemark.nodes;

  const [selected, setSelected] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<
    Array<MarkDownRemarkGroupConnection>
  >([]);

  let query = "";
  if (typeof document !== "undefined") {
    query = DashToSpace(document.location.search);
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
          // @ts-ignore @TODO: 구조 파악 후 재구성
          onClick={(tag) => {
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
