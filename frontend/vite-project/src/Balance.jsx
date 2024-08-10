import axios from "axios"
import { useEffect, useState } from "react"

export const Balance = () => {
    const[value,setvalue]=useState(0)
const token =localStorage.getItem("token")

useEffect(()=>{
    axios.get("http://localhost:4000/api/account/balance",{headers:{'Authorization':'Bearer '+token}}).then(response=>{
        setvalue(response.data.balance)
    })
},[])
    
        


    
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}