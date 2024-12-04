/* eslint-disable @typescript-eslint/no-unused-vars */
//sender.tsx
import { useEffect, useState } from "react";

export function Sender() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "sender" }));
    };
    setSocket(socket);
  }, []);

  async function startSendingVideo() {
    console.log("In sender Page");
    if (!socket) return;

    //1. B1 create an RTCPeerConnection
    const pc = new RTCPeerConnection();
    pc.onnegotiationneeded = async () => {
      console.log("onnnegitiation needed");
      //2. B1 create offer
      const offer = await pc.createOffer(); //sdp
      //3. B1 set the local description
      await pc.setLocalDescription(offer);
      socket?.send(
        JSON.stringify({ type: "createOffer", sdp: pc.localDescription })
      );
    };

    pc.onicecandidate = (event) => {
      console.log(event);
      if (event.candidate) {
        socket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: event.candidate })
        );
      }
    };

    //4. set local description

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "createAnswer") {
        pc.setRemoteDescription(data?.sdp);
      } else if (data.type === "iceCandidate") {
        pc.addIceCandidate(data.candidate);
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    pc.addTrack(stream.getVideoTracks()[0], stream);
  }

  return (
    <div>
      Sender
      <button onClick={startSendingVideo}>Send Video</button>
    </div>
  );
}
