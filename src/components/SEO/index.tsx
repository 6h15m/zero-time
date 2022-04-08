import React from "react";
import { Helmet } from "react-helmet";
import BlogConfig from "../../../blog-config";

type Props = {
  title: string;
  description: string | null;
  url: string;
};

export const SEO = ({ title, description, url }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content={`${BlogConfig.siteUrl}/og-image.png`}
      />
      {description && <meta name="description" content={description} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:image"
        content={`${BlogConfig.siteUrl}/og-image.png`}
      />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
};
