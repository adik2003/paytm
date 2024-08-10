const express=require("express")
const userrouter=express.Router();
const JWT=require("jsonwebtoken")
const zod=require("zod");
const { User, Account } = require("../dbschema");
const secret = require("../config");
const { authmiddle } = require("../middleware/user");
userrouter.get("/",(req,res)=>{
    res.json({
        msg:"sdssad"
    })
})

const signupschema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

const updateSchema=zod.object({
    username:zod.string(),
    password:zod.string(),firstName:zod.string(),lastName:zod.string(),
    id:zod.string()
})
const loginschema=zod.object({
    username:zod.string(),
    password:zod.string()})

   
userrouter.post('/signup',async(req,res)=>{
    const body=req.body;
    const {success}=signupschema.safeParse(req.body);
    if(!success){
  
        return res.status(400).json({
            msg:"invalid schema"
            
        })
       
    }
    
       const dbuser= await User.create(
            body

        )
        const userId=dbuser._id;

        await Account.create({
            userId:dbuser._id,
            balance: 1 + Math.random() * 10000
        })
        
        const token=JWT.sign({
            userId
        },secret);
        res.json({
            msg:"user created",
            token:token,
            userId:userId
        })
    

})

userrouter.post("/login",async (req,res)=>{
    const body=req.body;
    const loginparse=loginschema.safeParse(body);
    if(!loginparse.success){
        return res.json({
            msg:"invalid inputs"
        })
    }

    const yes=await User.findOne(body);
    if(!yes){
        return res.json({
            msg:"invalid "
        })
    }
    
    else {
const userId=yes._id
        const token=JWT.sign({
            userId
        },secret);
        res.json({
msg:"logged in",
token:token,
userId:userId
        })
    }
})
userrouter.put('/update',authmiddle,async (req,res)=>{
    const body=req.body;
    const parser=updateSchema.safeParse(body);
    if(!parser.success){
        return res.status(400).json({
            msg:"invalid input"
        })
    }
    const u=await User.updateOne({_id:req.body.id},{
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })
    res.json({
        msg:"user updated"
    })
})

userrouter.get("/bulk",async(req,res)=>{
    const filter=req.query.filter||"";
    const users=await User.find({
$or:[{
    firstName:{
        "$regex":filter
    }
},{
    lastname:{
        "$regex":filter
    }
    }
    ]
})
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id

        }))
    })
   

})



module.exports=userrouter