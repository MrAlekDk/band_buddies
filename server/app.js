import express from "express";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 3000;

//middleware setup
import helmet from "helmet";
app.use(helmet());

import rateLimit from 'express-rate-limit';

const baseLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 500, // Limit 
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(baseLimiter);

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