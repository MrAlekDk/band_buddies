import express from "express";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
const router = express.Router();

import db from "../database/createConnection.js";

import { authToken } from "./auth.js";
router.use(express.json());

router.get("/user", authToken, (req,res)=>{
    const user = req.user;
    try{
        res.json({user});
    }
    catch{
        res.sendStatus(404)
    }
});

router.post("/register", async (req,res)=>{
    const { user } = req.body;
    const login = await db.users.findOne({email: user.email});
    if(login === null){
        try{
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            user.likedUsers=[]
            user.dislikedUsers=[]
            db.users.insertOne(user);
            
            //mailer.sendNewEmail(user.email, "Succesfully created account", "Welcome to BandBuddies!");
            res.json(user).status(201);
        }
        catch{
            res.sendStatus(400);
        }
        return;
    }
    res.sendStatus(403);
});

router.patch("/user", authToken, (req,res)=>{
    let data = req.body;
    const id = req.user._id;
    db.users.updateOne({_id : ObjectId(id)}, {$set: data});
    res.sendStatus(200);
});


export const profileRouter = router;