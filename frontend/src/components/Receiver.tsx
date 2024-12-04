//Receiver.tsx
import { useEffect, useRef } from "react";

export function Receiver() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "receiver" }));
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      const pc: RTCPeerConnection | null = null;
      if (message.type === "createOffer") {
        //create answer
        const pc = new RTCPeerConnection();
        pc.setRemoteDescription(message.sdp);
        pc.onicecandidate = (event) => {
          console.log(event);
          if (event.candidate) {
            socket?.send(
              JSON.stringify({
                type: "iceCandidate",
                candidate: event.candidate,
              })
            );
          }
        };

        pc.ontrack = (event) => {
          console.log(event);
          if (videoRef.current) {
            videoRef.current.srcObject = new MediaStream([event.streams[0]]);
          }
        };

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.send(
          JSON.stringify({ type: "createAnswer", sdp: pc.localDescription })
        );
      } else if (message.type === "createAnswer") {
        //set the remote desc
        // await
      } else if (message.type === "iceCandidate") {
        //add the ice candidate
        if (pc !== null) {
          // @ts-ignore
          pc.addIceCandidate(message.candidate);
        }
      }
    };
  }, []);

  return (
    <div>
      Receiver
      <video ref={videoRef}>hi</video>
    </div>
  );
}
