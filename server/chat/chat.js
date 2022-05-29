import express from "express";
import "dotenv/config";

const app = express();

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server);


export const myIo = io;