import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import classes from "./TClass.module.css";
import facetime from "../../assets/Facetime.svg";
import callPNG from "../../assets/VideoCall.png";

const socket = io("http://localhost:3432");

const TVideo = () => {
  const ref = useRef();

  // variables for streaming video
  const [stream, setStream] = useState();
  const [me, setme] = useState("");
  const [call, setcall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const callref = useRef();
  const offline = useRef();

  function inputEnter(e) {
    setUserID(e.target.value);
    if (e.target.value) {
      callref.current.style.display = "inline-block";
      offline.current.style.display = "none";
    } else {
      callref.current.style.display = "none";
      offline.current.style.display = "block";
    }
  }

  function streamCall() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
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

  //   Making to user create call
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    console.log(me);

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);

      connectionRef.current = peer;
    });
  };

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
        <button onClick={streamCall}>
          <img src={callPNG} />
        </button>
      </div>
      <div>
        <input onChange={inputEnter} />
        <button
          style={{ color: "white", backgroundColor: "black" }}
          onClick={() => callUser(userID)}
        >
          click.........
        </button>
      </div>
    </div>
  );
};

export default TVideo;
