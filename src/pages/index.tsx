import React, { useCallback, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Bio from "../components/Bio";
import PostList from "../components/PostList";
import SideTagList from "../components/SideTagList";
import VerticalSpace from "../components/VerticalSpace";
import TextField from "../components/TextField";
import { description, siteUrl, title } from "../../blog-config";

const SearchWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const tags = _.sortBy(data.allMarkdownRemark.group, ["totalCount"]).reverse();

  const [query, setQuery] = useState("");

  const filteredPosts = useCallback(
    posts.filter((post) => {
      const { frontmatter, rawMarkdownBody } = post;
      const { title } = frontmatter;
      const lowerQuery = query.toLocaleLowerCase();

      if (rawMarkdownBody.toLocaleLowerCase().includes(lowerQuery)) return true;

      return title.toLocaleLowerCase().includes(lowerQuery);
    }),
    [query],
  );

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to &quot;content/blog&quot; (or
        the directory you specified for the &quot;gatsby-source-filesystem&quot;
        plugin in gatsby-config.js).
      </p>
    );
  }

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={48} />
      <Bio />
      <SearchWrapper>
        <TextField onChange={(e) => setQuery(e.target.value)} />
      </SearchWrapper>
      <SideTagList tags={tags} />
      <PostList postList={filteredPosts} />
    </Layout>
  );
};

export default BlogIndex;

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
        rawMarkdownBody
      }
    }
  }
`;
