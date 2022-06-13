import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

import path from "path";
app.use(express.static(path.resolve("../client/public")));


import {authRouter, authToken} from "./routes/auth.js";
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

io.on("connection", (socket)=>{
  console.log("connection made", socket.id)
  const username = socket.handshake.auth.username;
  console.log(username)

  socket.join("some room");

  socket.on("private message", (data)=>{
      console.log(data);
      socket.to("some room").emit("private message", {data: {message: data.msg, img: data.img}});
      socket.emit("private message", {data: {message: data.msg, img: data.img}})
  })
})


app.get('*', (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"));
  });

server.listen(PORT, ()=>{
  console.log("Now running on port: ", PORT);
})