import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="layout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
