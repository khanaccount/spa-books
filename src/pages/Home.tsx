import React from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Main />
      </div>
      <Footer />
    </>
  );
};
