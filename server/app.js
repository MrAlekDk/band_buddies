import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;



app.get("/", (req, res)=>{

    res.send("Got it running")
});


app.listen(PORT, ()=>{
    console.log("Now running on port: ", PORT)
});