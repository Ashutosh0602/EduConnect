import React, { useEffect, useRef } from "react";
import classes from "./OClass.module.css";
import facetime from "../../assets/Facetime.svg";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import OVideo from "./OVideo";
import OFile from "./OFile";

const OClass = () => {
  const ref = useRef();
  const file = useRef();
  const param = useParams();

  async function post_file() {
    const formData = new FormData();
    formData.append("newFile", file.current.files[0]);

    fetch(`http://localhost:3432/student/${param.ID}/class`, {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });
  }

  return (
    <section className={`${classes.OClass_cont} flex`}>
      <div>
        {<OVideo />}
        <div>
          <input type="file" ref={file} name="file" onChange={post_file} />
        </div>
      </div>
      <div>{<OFile />}</div>
    </section>
  );
};

export default OClass;
