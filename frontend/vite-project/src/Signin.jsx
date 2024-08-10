

import { useState } from "react"
import { BottomWarning } from "./Bottomwarning"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { InputBox } from "./InputBox"
import { SubHeading } from "./Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signin ()  {
    const navigate=useNavigate();
const [username,setuername]=useState("");
const [password,setpassword]=useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onchange={(e)=>{
            setuername(e.target.value)
        }}placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onchange={(e)=>{
            setpassword(e.target.value)
        }}placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            const response=await axios.post("http://localhost:4000/api/user/login",{
                username,
                password
            })
            if(response.data.msg=="logged in"){
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("userId",response.data.userId)
            navigate("/dashboard")
            }
            else{
              alert("Wrong username or password")
            }

          }}label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}