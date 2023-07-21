import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import classes from "./TClass.module.css";
import facetime from "../../assets/Facetime.svg";
import callPNG from "../../assets/VideoCall.png";

const TVideo = () => {
  const ref = useRef();

  // variables for streaming video
  const [stream, setStream] = useState();
  const [me, setme] = useState("");
  const [call, setcall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const callref = useRef();
  const offline = useRef();

  function inputEnter(e) {
    if (e.target.value) {
      callref.current.style.display = "inline-block";
      offline.current.style.display = "none";
    } else {
      callref.current.style.display = "none";
      offline.current.style.display = "block";
    }
  }

  const socket = io("http://localhost:3432");

  return (
    <div
      ref={ref}
      className={classes.liveClass_cont}
      //   onChange={() => console.log(ref.current?.offsetWidth)}
    >
      <div className={classes.stream_cont}>
        <video
          playsInline
          muted
          autoPlay
          ref={userVideo}
          width={ref.current?.offsetWidth}
        />
      </div>
      <div className={classes.stream_cont_user}>
        <video
          playsInline
          muted
          autoPlay
          ref={myVideo}
          width={ref.current?.offsetWidth * 0.4}
        />
      </div>
      <div
        // ref={ref}
        className={classes.offline_cont}
      >
        <div ref={offline}>
          <img src={facetime} />
        </div>
      </div>
      <div ref={callref} className={classes.callPNG}>
        <button>
          <img src={callPNG} />
        </button>
      </div>
      <div>
        <input onChange={inputEnter} />
      </div>
    </div>
  );
};

export default TVideo;
