import React, { useRef } from "react";
import classes from "./TClass.module.css";
import { useParams } from "react-router";
import TVideo from "./TVideo";

const TClass = () => {
  const ref = useRef();
  const file = useRef();
  const param = useParams();

  return (
    <section className={classes.OClass_cont}>
      <div>
        {<TVideo />}
        <div>
          <input type="file" ref={file} name="file" />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default TClass;
