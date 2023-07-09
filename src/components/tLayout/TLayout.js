import React from "react";
import classes from "./TLayout.module.css";
import { Outlet } from "react-router";
import TNavbar from "../tNavbar/TNavbar";

const TLayout = () => {
  return (
    <main className={classes.tlayout}>
      <TNavbar />
      <Outlet />
    </main>
  );
};

export default TLayout;
