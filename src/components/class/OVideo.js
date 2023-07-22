import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import classes from "./OClass.module.css";
import facetime from "../../assets/Facetime.svg";
import callPNG from "../../assets/Call.png";

const socket = io("http://localhost:3432");

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

  function receiveCall() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        console.log(currentStream);
        myVideo.current.srcObject = currentStream;

        answerCall();
      });
  }

  // Setting websocket connection to share data
  useEffect(() => {
    socket.on("me", (id) => {
      console.log(id);
      setme(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setcall({ isRecievedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      console.log("from", call.from);
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  return (
    <div ref={ref} className={classes.liveClass_cont}>
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
        <button onClick={receiveCall}>
          <img src={callPNG} />
        </button>
      </div>
    </div>
  );
};

export default OVideo;
