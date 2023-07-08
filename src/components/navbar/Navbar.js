import React from "react";
import { NavLink } from "react-router-dom";
import profile from "../../assets/Profile.svg";
import home from "../../assets/home.svg";
import Oclass from "../../assets/class.svg";
import setting from "../../assets/setting.svg";
import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userId = useSelector((state) => state.userProfile.userId);

  return (
    <section className={classes.navlink}>
      <div className={classes.nav_cont}>
        <NavLink>
          <img alt="profile" src={profile} />
        </NavLink>
      </div>
      <div className={classes.nav_cont_other}>
        <NavLink to={`/student/${userId}`}>
          <img alt="home" src={home} />
        </NavLink>
      </div>
      <div className={classes.nav_cont_other}>
        <NavLink to={`class`}>
          <img alt="class" src={Oclass} />
        </NavLink>
      </div>
      <div className={classes.nav_cont_other}>
        <NavLink to={`setting`}>
          <img alt="setting" src={setting} />
        </NavLink>
      </div>
    </section>
  );
};

export default Navbar;
