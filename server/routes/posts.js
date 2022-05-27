import express from "express";
const router = express.Router();

import { authToken } from "./auth.js";
import db from "../database/createConnection.js";

router.use(express.json());

router.get("/post", async (req,res)=>{
   const posts = await db.posts.find({}).toArray();
    if(posts){
        res.json({data: posts});
    }
    else{
        res.sendStatus(404);
    }
});

router.post("/post", authToken, (req,res)=>{
    console.log("make post")
    const user = req.user;
    if(user){
        const post = req.body.post
        post.auther = user.name
        db.posts.insertOne(post);
        res.sendStatus(200)
    }
    else{
        res.sendStatus(403)
    }
});

router.delete("/post", (req,res)=>{
    
});

export const postRouter = router;