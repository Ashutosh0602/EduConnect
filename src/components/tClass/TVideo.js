import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import classes from "./TClass.module.css";
import facetime from "../../assets/Facetime.svg";

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

  const socket = io("http://localhost:3432");

  return (
    <div
      ref={ref}
      className={classes.liveClass_cont}
      onChange={() => console.log(ref.current?.offsetWidth)}
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
      <div
        // ref={ref}
        className={classes.offline_cont}
      >
        <div>
          <img src={facetime} />
        </div>
      </div>
    </div>
  );
};

export default TVideo;
