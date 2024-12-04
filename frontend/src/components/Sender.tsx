import { useEffect, useState } from "react";

export function Sender() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "sender" }));
    };
  }, []);

  async function startSendingVideo() {
    // B1 create an RTCPeerConnection
    const pc = new RTCPeerConnection();
    //B1 create offer
    const offer = await pc.createOffer(); //sdp
    // B1 set the local description
    await pc.setLocalDescription(offer);

    // set local description
    socket?.send(JSON.stringify({ type: "createOffer", sdp: pc.localDescription }));
  }

  return (
    <div>
      Sender
      <button onClick={startSendingVideo}>Send Video</button>
    </div>
  );
}
