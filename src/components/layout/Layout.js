import React from "react";
import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import classes from "./Layout.module.css";

const Layout = () => {
  return (
    <main className={classes.layout}>
      <Navbar />
      <Outlet className={classes.main_cont} />
    </main>
  );
};

export default Layout;
