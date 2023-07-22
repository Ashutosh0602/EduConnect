import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import classes from "./OClass.module.css";
import facetime from "../../assets/Facetime.svg";
import callPNG from "../../assets/Call.png";
import callDPNG from "../../assets/Phone_off.png";

const socket = io("http://localhost:3432");

const OVideo = () => {
  const ref = useRef();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const callPick = useRef();
  const callLeave = useRef();
  const offline = useRef();

  const [stream, setStream] = useState();
  const [me, setme] = useState("");
  const [call, setcall] = useState({});
  const [IsCalling, setIsCalling] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  function receiveCall() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;

        answerCall();
        setCallAccepted(true);
      });
  }

  useEffect(() => {
    if (IsCalling) {
      callPick.current.style.display = "block";
      offline.current.style.display = "none";
    } else {
      offline.current.style.display = "block";
      callPick.current.style.display = "none";
    }
  }, [IsCalling]);

  useEffect(() => {
    if (callAccepted) {
      callPick.current.style.display = "none";
      callLeave.current.style.display = "block";
    }
  }, [callAccepted]);

  // Setting websocket connection to share data
  useEffect(() => {
    socket.on("me", (id) => {
      console.log(id);
      setme(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log("from", from);
      setcall({ isRecievedCall: true, from, name: callerName, signal });
      setIsCalling(true);
      //   console.log(call);
      //   callPick.current.style.display = "block";
    });
  }, []);

  const answerCall = () => {
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  //   Leave the stream
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    // call;
    window.location.reload();
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
      <div className={classes.offline_cont}>
        <div ref={offline}>
          <img src={facetime} />
        </div>
      </div>
      <div ref={callPick} className={classes.callPNG}>
        <button onClick={receiveCall}>
          <img src={callPNG} />
        </button>
      </div>
      <div ref={callLeave} className={classes.callPNG}>
        <button ref={callLeave} onClick={leaveCall}>
          <img src={callDPNG} />
        </button>
      </div>
    </div>
  );
};

export default OVideo;
