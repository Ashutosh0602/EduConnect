import React, { useRef } from "react";
import classes from "./OClass.module.css";
import facetime from "../../assets/Facetime.svg";

const OClass = () => {
  const ref = useRef();
  return (
    <section className={classes.OClass_cont}>
      <div>
        <div>
          <div
            ref={ref}
            onChange={() => console.log(ref.current.offsetWidth)}
            className={classes.offline_cont}
          >
            <div>
              <img src={facetime} />
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div></div>
    </section>
  );
};

export default OClass;
