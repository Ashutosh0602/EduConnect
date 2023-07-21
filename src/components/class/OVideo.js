import React, { useRef, useState } from "react";
import classes from "./OClass.module.css";
import facetime from "../../assets/Facetime.svg";
import callPNG from "../../assets/Call.png";

const OVideo = () => {
  const ref = useRef();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const [stream, setStream] = useState();
  const [me, setme] = useState("");
  const [call, setcall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

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
        <div>
          <img src={facetime} />
        </div>
      </div>
      <div className={classes.callPNG}>
        <button>
          <img src={callPNG} />
        </button>
      </div>
    </div>
  );
};

export default OVideo;
