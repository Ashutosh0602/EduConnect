import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import classes from "./Layout.module.css";

const Layout = () => {
  const width = window.innerWidth;
  window.onresize = () => {
    if (window.innerWidth < width) {
      debugger;
    }
  };
  return (
    <main className={classes.layout} onClick={(e) => console.log(window)}>
      <Navbar />
      <Outlet className={classes.main_cont} />
    </main>
  );
};

export default Layout;
