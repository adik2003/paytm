
import { useNavigate } from "react-router-dom";
import { Appbar } from "./appbar";
import { Balance } from "./Balance";
import { Users } from "./user";
import { useEffect, useState } from "react";


export function Dashboard(){
    const navigate=useNavigate();
    const [alertShown, setAlertShown] = useState(false);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
    
        if (!userId && !alertShown) {
          alert('You must be logged in to access the dashboard');
          setAlertShown(true);
          navigate('/signin');
        }
      }, [alertShown, navigate]);
    
   
    
    return <>
    <Appbar></Appbar>
    <Balance></Balance>
    <Users></Users>
    </>
    
}