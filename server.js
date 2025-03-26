const WebSoc = require('ws');
const server = new WebSoc.Server({port : 8080});

console.log("WebSocket Server is running on port 8080");

let clients = new Set();

server.on('connection', (ws) => {
  clients.add(ws);
  console.log("New Client connected.");

  ws.on("message",(message) => {
    for(let client of clients){
      if(client.readyState === WebSocket.OPEN){
        client.send(message.toString());
      }
    }
  })

  ws.on('close', () =>{
    clients.delete(ws);
    console.log("Client disconnected");
  })
})