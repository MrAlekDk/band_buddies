import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();

import db from "../database/createConnection.js";

import { authToken } from "./auth.js";
router.use(express.json());

router.get("/usersToMatch", authToken, async (req,res)=>{
    let user = req.user
    const users = await db.users.find({email: { $ne: user.email}}).toArray();
    res.json({data: users});
})

router.post("/rate", authToken, (req,res)=>{
    const user = req.user;
    const rating = req.body.rating
    const ratedUserId = req.body.userId
    console.log(rating,ratedUserId)
    if(rating === "like"){
        db.users.updateOne({_id : ObjectId(user._id)}, {$addToSet: {likedUsers: ratedUserId}});
    }
    else if(rating === "dislike"){
        db.users.updateOne({_id : ObjectId(user._id)}, {$addToSet: {dislikedUsers: ratedUserId}});
    }

    res.sendStatus(200)
});

export const matchingRouter = router;