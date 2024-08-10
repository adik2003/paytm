const express =require("express");
const zod=require("zod");
const { Account } = require("../dbschema");
const { authmiddle } = require("../middleware/user");
const mongoose=require("mongoose")
const accountrouter=express.Router();
accountrouter.get("/",(req,res)=>{
    res.json({
        msg:"up"
    })
})

const tschema=zod.object({
 toid:
    zod.string(),
    sendid:zod.string(),
    amount:zod.number()

 
})


accountrouter.get("/balance", authmiddle, async (req, res) => {
   
    const account = await Account.findOne({
       userId:req.userId
    });
   

    res.json({
        balance: account.balance
    })
});

accountrouter.post("/transfer",authmiddle, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
});


module.exports=accountrouter;
