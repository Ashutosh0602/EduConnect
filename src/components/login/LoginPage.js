import React, { useEffect, useRef, useState } from "react";
import backgrounds from "../../assets/background.svg";
import UserLogin from "./UserLogin";
import TeacherLogin from "./TeacherLogin";
import ParentLogin from "./ParentLogin";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const img_slide = useRef();
  const [slide_width, setslide_width] = useState("");
  useEffect(() => {
    setslide_width(img_slide.current.offsetWidth);
  }, []);

  return (
    <section className="flex">
      <div className="w-6/12">
        <div className={`sm:mx-auto sm:w-full sm:max-w-sm `}>
          <img
            className="mx-auto h-40 w-auto"
            src="https://www.media8.co.uk/new/wp-content/uploads/2015/10/Leeds_Tuition_Centre_Logo.jpg"
            alt="Your Company"
          />
        </div>
        <div className="flex">
          <div>Student</div>
          <div>Parent</div>
          <div>Teacher</div>
        </div>
        <div ref={img_slide} className={`flex ${classes.login_handle}`}>
          <UserLogin width={slide_width} className={classes.login_cont} />
          <TeacherLogin width={slide_width} />
          <ParentLogin width={slide_width} />
        </div>
      </div>
      <div className="w-8/12 h-screen">
        <img src={backgrounds} />
      </div>
    </section>
  );
};

export default LoginPage;
