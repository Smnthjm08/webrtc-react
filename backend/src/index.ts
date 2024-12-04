//index.ts
import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: any = null;
let receiverSocket: any = null;

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data: any) {
    const message = JSON.parse(data);

    if (message.type === "sender") {
      console.log("Sender Set");
      senderSocket = ws;
    } else if (message.type === "receiver") {
      console.log("Receiver Set");
      receiverSocket = ws;
    } else if (message.type === "createOffer") {
      if (ws !== senderSocket) return;

      console.log("Offer Received");
      receiverSocket?.send(
        JSON.stringify({ type: "createOffer", offer: message.sdp })
      );
    } else if (message.type === "createAnswer") {
      senderSocket?.send(
        JSON.stringify({ type: "createAnswer", sdp: message.sdp }) // Correct
      );
    } else if (message.type === "iceCandidate") {
      console.log("offer received");

      if (ws === senderSocket) {
        receiverSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      } else if (ws === receiverSocket) {
        senderSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      }
    }

    //identify as sender
    //identify as reciever
    //create offer
    //create answer
    //send ice candidate

    console.log("Message", message);
  });
});
