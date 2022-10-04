import React, { ReactNode } from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { GlobalProvider } from "../../context/GlobalContext";

type Props = {
  children: ReactNode;
};
export const Layout = ({ children }: Props) => {
  return (
    <GlobalProvider>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </GlobalProvider>
  );
};
