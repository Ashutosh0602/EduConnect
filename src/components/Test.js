import React, { useRef } from "react";

const Test = () => {
  const ref = useRef();
  const rtp = new RTCPeerConnection();
  const rt = RTCDataChannel;

  console.log(rt);
  console.log(rtp.createOffer());

  function start() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(handleSuccess);
  }

  function handleSuccess(stream) {
    ref.current.srcObject = stream;
    console.log(stream);
  }

  function stop() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(handleStop);
  }

  function handleStop(stream) {
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
  return (
    <div>
      Test
      <video ref={ref} autoPlay playsInline muted></video>
      {/* <canvas ref={ref} ></canvas> */}
      <button onClick={start}>Start</button>
      <button onClick={stop}>Hang UP</button>
    </div>
  );
};

export default Test;
