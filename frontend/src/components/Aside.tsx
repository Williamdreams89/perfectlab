import axios from "axios";
import { useEffect, useState } from "react";

const Aside = () => {
  const [authData, setAuthdata] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      const api_token = localStorage.getItem("access_token_f");
      if (api_token) {
        const { data } = await axios.post("https://perfectlab-backend.onrender.com/user/check_token_exp/", { token: api_token });
        setAuthdata(data);
        localStorage.setItem("username", data?.first_name)
      }
    };


    fetchData();

    setInterval(fetchData, 1000);
    // return () => clearInterval(intervalId);
  }, []); 
  
  return (
    <div className=' bg-black  text-white h-[100vh] pr-6 pl-6 aside aside'>
        <h2 className=' pt-5 mb-4 text-3xl flex flex-row items-center justify-center'>Perfect Lab <img src="icons/lab.png" alt="" width={"30px"} /></h2>
        <ul className=' list-none w-[98%] rounded-2xl p-2 m-auto' style={{border:"1px solid rgba(107, 114, 128, .2)"}}>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>window.location.href=("/")} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>My Dashboard</li>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>window.location.href=("/myAppointments")} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>Apointment Calender</li>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>{window.location.href=("/findAppointment")}} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>Find Appointment</li>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>window.location.href=("/addNewAppointment")} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>Book Appointment</li>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>window.location.href=("/addNewClient")} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>Add client</li>
        </ul>

       <div className=' text-center mt-6 w-[88%] rounded-2xl p-2 m-auto' style={{border:"1px solid rgba(107, 114, 128, .2)"}}>
            <h2>Accounts</h2>
            <h3>Logged in as: {localStorage.getItem("username")}</h3>
            <h4>My Job Role</h4>
            <button onClick={()=>{localStorage.removeItem("access_token_f"); localStorage.removeItem("username"); window.location.href="/"}}>Logout</button>
        </div>
    </div>
  )
}

export default Aside