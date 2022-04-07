import React from "react";
import styled from "styled-components";
import BlogConfig from "../../blog-config";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFound = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.tertiaryText};

  & > h2 {
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 48px;
  }

  & > h3 {
    font-weight: lighter;
    font-size: 30.4px;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <SEO
      title={BlogConfig.title}
      description={BlogConfig.description}
      url={BlogConfig.siteUrl}
    />
    <NotFound>
      <h2>404 ERROR</h2>
      <h3>Page Not Found :(</h3>
    </NotFound>
  </Layout>
);

export default NotFoundPage;
