
const Aside = () => {
  
  return (
    <div className=' bg-black  text-gray-400 '>
        <h2 className=' pt-5 mb-4 text-3xl flex flex-row items-center justify-center'>Perfect Lab <img src="icons/lab.png" alt="" width={"30px"} /></h2>
        <ul className=' list-none w-[88%] rounded-2xl p-2 m-auto' style={{border:"1px solid rgba(107, 114, 128, .2)"}}>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>window.location.href=("/")} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>My Dashboard</li>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>window.location.href=("/myAppointments")} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>Apointment Calender</li>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>{window.location.href=("/findAppointment")}} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>Find Appointment</li>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>window.location.href=("/addNewAppointment")} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>Book Appointment</li>
            <li className=' w-[80%] cursor-pointer mb-[1rem] m-auto hover:text-white' onClick={()=>window.location.href=("/addNewClient")} style={{borderBottom: "1px solid rgba(107, 114, 128, .2)"}}>Add client</li>
        </ul>

        <div className=' mt-6 w-[88%] rounded-2xl p-2 m-auto' style={{border:"1px solid rgba(107, 114, 128, .2)"}}>
            <h2>Account Information</h2>
            <h3>Registered User Name</h3>
            <h4>Registered User Role</h4>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Aside