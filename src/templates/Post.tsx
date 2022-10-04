import React from "react";
import { graphql } from "gatsby";
import BlogConfig from "../../blog-config";
import { Layout, Article, SEO } from "../components";

type Tag = {
  fieldValue: string;
  totalCount: number;
};

type TArticle = {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
};

type Frontmatter = {
  date: string;
  update: string;
  title: string;
  tags: Array<Tag>;
  series: string;
  description: string | null;
};

type SeriesPost = {
  node: {
    id: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
};

type Series = {
  id: string;
  frontmatter: { title: string };
  fields: { slug: string };
  currentPost: boolean;
};

type ReadingTime = {
  minutes: number;
};

type PageQueryResult = {
  markdownRemark: {
    html: string;
    id: string;
    frontmatter: Frontmatter;
    fields: {
      readingTime: ReadingTime;
      slug: string;
    };
  };
  previous: TArticle;
  next: TArticle;
  seriesList: {
    edges: Array<SeriesPost>;
  };
};

type Props = {
  data: PageQueryResult;
};

const Post = ({ data }: Props) => {
  const post = data.markdownRemark;
  const { previous, next, seriesList } = data;

  const { title, date, tags, series, description } = post.frontmatter;
  const { readingTime, slug } = post.fields;

  let filteredSeries: Array<Series> = [];
  if (series !== null) {
    filteredSeries = seriesList.edges.map((seriesPost) => {
      if (seriesPost.node.id === post.id) {
        return {
          ...seriesPost.node,
          currentPost: true,
        };
      } else {
        return {
          ...seriesPost.node,
          currentPost: false,
        };
      }
    });
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        url={`${BlogConfig.siteUrl}${slug}`}
      />
      <div>
        <Article.Header
          title={title}
          date={date}
          tags={tags}
          minToRead={Math.round(readingTime.minutes)}
          hasSeries={filteredSeries.length > 0}
        />
        {filteredSeries.length > 0 && (
          <Article.Series header={series} series={filteredSeries} />
        )}
        <Article.Body html={post.html} />
        <Article.Footer previous={previous} next={next} />
      </div>
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $series: String
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200, truncate: true)
      html
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        update(formatString: "YYYY.MM.DD")
        tags
        series
        description
      }
      fields {
        slug
        readingTime {
          minutes
        }
      }
    }
    seriesList: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
