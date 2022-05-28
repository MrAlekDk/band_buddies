import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();

import db from "../database/createConnection.js";

import { authToken } from "./auth.js";
router.use(express.json());

router.get("/matches", authToken, async (req, res)=>{
    const user = req.user
    const obj_ids = user.likedUsers.map(id => ObjectId(id))
    const matches = await db.users.find({$and:[{_id: {$in: obj_ids}},
                                               {likedUsers: user._id}]})
                                                .toArray();
    res.json({data: matches});
});

router.get("/usersToMatch", authToken, async (req,res)=>{
    let user = req.user
    const obj_likedIds = user.likedUsers.map(id => ObjectId(id))
    const obj_dislikedIds = user.dislikedUsers.map(id => ObjectId(id))
    const users = await db.users.find({ $and: [{_id: {$nin: obj_likedIds}}, 
                                                {_id:{$nin: obj_dislikedIds}},
                                                {email: { $ne: user.email}}]})
                                                .toArray();
    if(users.length > 0) res.json({data: users});
    else res.sendStatus(404); 
});

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