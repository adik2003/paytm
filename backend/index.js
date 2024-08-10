const express=require("express");
const app=express();
const cors=require("cors")
const port=4000
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://adikumar20032003:k83aW8arTW3O6gD5@cluster0.usz8qad.mongodb.net/paytm-28-06")
const userrouter = require('./routes/userroute');
const accountrouter = require("./routes/account");



app.use(express.json())
app.use(cors())
app.use("/api/user",userrouter)
app.use("/api/account",accountrouter)

app.get("/",(req,res)=>{
    res.send("chal rha hai bhai")
})
app.listen(port,()=>{
    console.log(`bring the zaza at ${port}`)
})