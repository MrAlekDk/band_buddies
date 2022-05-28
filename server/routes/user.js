import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();

import db from "../database/createConnection.js";

import { authToken } from "./auth.js";
router.use(express.json());

router.get("/user", authToken, (req,res)=>{
    const user = req.user;
    res.json({user});
});

router.patch("/user", authToken, (req,res)=>{
    let data = req.body;
    const id = req.user._id;
    db.users.updateOne({_id : ObjectId(id)}, {$set: data});
    res.sendStatus(200);
});


export const profileRouter = router;
