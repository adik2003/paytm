const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    username:String,password:String,firstName:String,lastName:String
})

const User=mongoose.model("User",userSchema)



const accountschema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true

    },
    balance:{
        type:Number,
        required:true
    }

})

const Account=mongoose.model("Account",accountschema)

module.exports={
    User,
    Account
    }