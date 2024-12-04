import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: any = null;
let recieverSocket: any = null;

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data: any) {
    const message = JSON.parse(data);

    if (message.type === "sender") {
      senderSocket = ws;
    } else if (message.type === "receiver") {
      recieverSocket = ws;
    } else if (message.type === "createOffer") {
      recieverSocket?.send(
        JSON.stringify({ type: "offer", offer: message.offer })
      );
    } else if (message.type === "create-answer") {
      if (!recieverSocket) {
        return;
      }
      senderSocket?.send(
        JSON.stringify({ type: "offer", offer: message.offer })
      );
    }

    //identify as sender
    //identify as reciever
    //create offer
    //create answer
    //send ice candidate

    console.log("Message", message);
  });
});
