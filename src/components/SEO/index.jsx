import React from "react";
import { Helmet } from "react-helmet";
import { siteUrl } from "../../../blog-config";

const SEO = ({ title, description, url }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      {description && <meta name="description" content={description} />}
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.png`} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
};

export default SEO;
