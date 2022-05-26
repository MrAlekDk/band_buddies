import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

import path from "path";
app.use(express.static(path.resolve("../client/public")));


import {authRouter, authToken} from "./routes/auth.js";
app.use(authRouter);

import {profileRouter} from "./routes/user.js";
app.use(profileRouter);

//
app.get('*', (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"));
  });

app.listen(PORT, ()=>{
    console.log("Now running on port: ", PORT);
});