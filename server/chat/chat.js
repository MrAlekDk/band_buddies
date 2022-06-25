import express from "express";
import "dotenv/config";

const app = express();

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server);


function init(app){
    const server = http.createServer(app);
    const io = new Server(server);

    let rooms=[];
io.on("connection", (socket)=>{
  let clientId = socket.handshake.auth.clientId
  let matchId = socket.handshake.auth.matchId
  //checks if the client's match has created a room
  if(rooms.includes(matchId+clientId)){
    socket.join(rooms.find(room => room===matchId+clientId));
  }
  //checks if the client has created a room earlier
  else if(rooms.includes(clientId+matchId)){
    socket.join(rooms.find(room => room===clientId+matchId));
  }
  else{
    rooms.push(clientId+matchId)
    socket.join(clientId+matchId);
  }

  socket.on("private message", (data)=>{
    let room="";
      if(rooms.find(room => data.clientId+matchId===room)){
         room = clientId+matchId;
      }
      else{
        room = matchId+clientId;
      }
      socket.to(room).emit("private message", {data: {auther: data.auther, message: data.msg, img: data.img}});
      socket.emit("private message", {data: {auther: data.auther, message: data.msg, img: data.img}})
  })

})
return server
}


export default init;