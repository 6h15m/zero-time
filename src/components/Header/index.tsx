import React from "react";
import { Link } from "gatsby";

type Props = {
  siteTitle: string;
};

export const Header = ({ siteTitle = "" }: Props) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `23.2px`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `23.2px 17.4px`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);
