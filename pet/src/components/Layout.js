import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./navComponent";
import Home from "./homeComponent";
import { useSelector } from "react-redux";

const Layout = () => {
  const curUser = useSelector((state) => state.curUser);
  console.log(curUser);
  return (
    <>
      <Nav />
      <Home />
      <Outlet />
    </>
  );
};

export default Layout;
