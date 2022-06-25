import express from "express";
import session from "express-session";

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

import init from "./chat/chat.js"
const server = init(app)

app.use(session(
  {secret: 'mySecret', 
  resave: false, 
  saveUninitialized: false}
  ));

app.get('*', (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"));
  });

server.listen(PORT, ()=>{
  console.log("Now running on port: ", PORT);
})