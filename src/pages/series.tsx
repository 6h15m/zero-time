import React from "react";
import {
  pipe,
  map,
  groupBy,
  entries,
  sortBy,
  filter,
  reverse,
  toArray,
} from "@fxts/core";
import styled from "styled-components";
import { graphql } from "gatsby";
import BlogConfig from "../../blog-config";
import {
  SEO,
  Layout,
  SeriesList,
  VerticalSpace,
  NoContent,
} from "../components";

type Frontmatter = {
  date: string;
  update: string;
  title: string;
  tags: Array<string>;
  series: string;
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
    nodes: Array<MarkDownRemarkGroupConnection>;
  };
};

type Props = {
  data: PageQueryResult;
};

const Title = styled.div`
  font-size: 14px;
  text-align: right;
  margin-top: 50px;
  color: black;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const SeriesPage = ({ data }: Props) => {
  const posts = data.allMarkdownRemark.nodes;
  const series = pipe(
    posts,
    map((post) => ({ ...post.frontmatter, slug: post.fields.slug })),
    groupBy((post) => post.series),
    entries,
    map(([, series]) => ({
      name: series[0].series,
      posts: series,
      lastUpdated: series[0].date,
    })),
    sortBy((series) => new Date(series.lastUpdated)),
    filter((series) => series.name),
    reverse,
    toArray,
  );

  return (
    <Layout>
      <SEO
        title={BlogConfig.title}
        description={BlogConfig.description}
        url={BlogConfig.siteUrl}
      />
      <Title>{series.length} Series</Title>
      {series.length === 0 && <NoContent name="series" />}
      <VerticalSpace size={14} />
      <SeriesList seriesList={series} />
    </Layout>
  );
};

export default SeriesPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          tags
          series
          description
        }
      }
    }
  }
`;
