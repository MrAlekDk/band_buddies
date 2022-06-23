import express from "express";
import db from "../database/createConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const router = express.Router();

router.use(express.json());


router.post("/login", async (req,res)=>{
    let user = await db.users.findOne({email: req.body.user.email});
    if(user === null){
        res.status(404).send("User doesn't exist");
    }
    else{
        try{
            if(await bcrypt.compare(req.body.user.password, user.password)){
                const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
                user.token = accesToken;
                res.json({accesToken});
            } else {
                res.sendStatus(403).send("Wrong password");
            }
        }
        catch{
            res.sendStatus(500);
        }
    }
});

router.get("/refreshToken", authenticateToken, async(req,res)=>{
    let refreshedUser = await db.users.findOne({email: req.user.email});
    
    if(refreshedUser === null){
        res.status(404).send("User doesn't exist");
    }
    else{
        try{
            console.log("start of try")
                const accesToken = jwt.sign(refreshedUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
                console.log(accesToken)
                refreshedUser.token = accesToken;
                res.json({accesToken});
        }
        catch{
            console.log("error")
            res.sendStatus(500);
        }
    }

});


function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    });
}

router.post("/logOut", (req,res)=>{
    console.log("log out")
        res.sendStatus(200)
    });

    export const authRouter = router;
    export const authToken = authenticateToken;