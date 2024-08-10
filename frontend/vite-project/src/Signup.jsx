
import { useState } from "react"
import { BottomWarning } from "./Bottomwarning"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { InputBox } from "./InputBox"
import { SubHeading } from "./Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signup = () => {

    const navigate=useNavigate();
    const [firstName,setfirstname]=useState("");
    const [lastName,setlastname]=useState("");
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("")

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Signup"}></Heading>
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox  onchange={(e)=>{setfirstname(e.target.value)}}placeholder="John" label={"First Name"} />
        <InputBox  onchange={(e)=>{setlastname(e.target.value)}}placeholder="Doe" label={"Last Name"} />
        <InputBox  onchange={(e)=>{setusername(e.target.value)}}placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onchange={(e)=>{setpassword(e.target.value)} }placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            const response=await axios.post("http://localhost:4000/api/user/signup",{
                
                username,
                firstName,
                lastName,
                password
            })
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId",response.data.userId)
            
            navigate("/dashboard")
          }}label={"Sign up"} />
         
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}