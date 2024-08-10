import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate=useNavigate();
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex ">
        <button  onClick={()=>{
            localStorage.clear("token");
            localStorage.clear("userId");
            alert("You are now logged out redirecting to signin")
            navigate("/signin");

        }}className="pr-5 rounded-md ">Logout</button>
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}