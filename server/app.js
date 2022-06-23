import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

import path from "path";
app.use(express.static(path.resolve("../client/public")));


import {authRouter} from "./routes/auth.js";
app.use(authRouter);

import {profileRouter} from "./routes/user.js";
app.use(profileRouter);

import {postRouter} from "./routes/posts.js";
app.use(postRouter);

import {matchingRouter} from "./routes/matching.js";
app.use(matchingRouter);

import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

let rooms=[];
io.on("connection", (socket)=>{
  let clientId = socket.handshake.auth.clientId
  let matchId = socket.handshake.auth.matchId

  if(rooms.includes(matchId+clientId)){
    socket.join(rooms.find(room => room===matchId+clientId));
  }
  else if(rooms.includes(clientId+matchId)){
    socket.join(rooms.find(room => room===clientId+matchId));
  }
  else{
    rooms.push(clientId+matchId)
    socket.join(clientId+matchId);
  }

  socket.on("private message", (data)=>{
    //let clientId = socket.handshake.auth.clientId
    //let matchId = socket.handshake.auth.matchId
    let room="";
      if(rooms.find(room => data.clientId+matchId===room)){
         room = clientId+matchId;
      }
      else{
        room = matchId+clientId;
      }
      socket.to(room).emit("private message", {data: {message: data.msg, img: data.img}});
      socket.emit("private message", {data: {message: data.msg, img: data.img}})
  })

})

app.get('*', (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"));
  });

server.listen(PORT, ()=>{
  console.log("Now running on port: ", PORT);
})