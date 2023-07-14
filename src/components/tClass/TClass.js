import React, { useRef } from "react";
import facetime from "../../assets/Facetime.svg";
import classes from "./TClass.module.css";
import { useParams } from "react-router";

const TClass = () => {
  const ref = useRef();
  const file = useRef();
  const param = useParams();

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
        <div>
          <input type="file" ref={file} name="file" />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default TClass;
