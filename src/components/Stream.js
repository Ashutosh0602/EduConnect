import React from "react";

const Stream = () => {
  const rtp = new RTCPeerConnection();
  rtp
    .createOffer()
    .then((offer) => rtp.setLocalDescription(offer))
    .then(() => {
      sendToServer({
        name: "Ashutosh Rai",
        target: "targetUsername",
        type: "video-offer",
        sdp: rtp.localDescription,
      });
    });
  return <div>Stream</div>;
};

export default Stream;
