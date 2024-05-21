import axios from "axios";
import { ComboboxItem, Notification, Select, TextInput } from "@mantine/core";
import Loading from "../common/Loading";
import React, {useState, useEffect} from "react"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const Login = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<ComboboxItem | null>(null)

  const [loginStatus, setLoginStatus] = useState<any>()

  const onFormSubmit = async (event:any) => {
    event.preventDefault()
    try{
      setIsLoading(true)
      const {data} = await axios.post("https://perfectlab-backend.onrender.com/user/login/", {email:email, password:password})
      console.log(data, data["tokens"]["access_token"])
      localStorage.clear()
      localStorage.setItem("access_token_f", data["tokens"]["access_token"])
      await axios.post("https://perfectlab-backend.onrender.com/user/check_token_exp/", {token:localStorage.getItem("access_token_f")})
      .then((response:any)=>{
        console.log("checked token output =",response.data, typeof response.data)

        if(response.data["is_lab_tech"] == "True"){
          console.log("is lab guy", response.data["is_lab_tech"])
          localStorage.setItem("is_lab_technician", response.data["is_lab_tech"])
        }
        if(response.data["is_clerk"] == "True"){
          localStorage.setItem("is_cler", response.data["is_clerk"])
        }
        if(response.data["is_employer"] == "True"){
          localStorage.setItem("is_employer", response.data["is_employer"])
        }
        setLoginStatus(response.data)
        setIsLoading(false)
      })
      // window.location.href = "/"
    }catch(err){
      setIsLoading(false)
      alert("Wrong username or password")
      console.log("error login: ", err)
    }
  
  }
  

  const emailChange = (e:any)=>{
    e.preventDefault()
    setEmail(e.target.value)
  }

  const passwordChange = (e:any)=>{
    e.preventDefault()
    setPassword(e.target.value)
  }

  return (
    <div className="flex justify-center w-[100vw] h-[100vh] absolute bg-white z-50 left-0 top-0">
      <div className=" authLeftBox md:w-[45vw] lg:w-[25vw]  h-[100%] relative">
        <div className=" flex items-center justify-center absolute top-0 left-0" style={{width:"100%", height:"100%", backgroundColor:"rgba(37, 99, 235, .8"}}>
          <div className="flex flex-col w-[90%] h-[90%] items-center justify-between">
            <h2 className=" text-5xl text-center text-white font-extrabold">LabIS</h2>
            <div className="">
              <h2 className=" text-xl font-thin text-white w-[90%] text-center">Lab Information System</h2>
              <p className=" text-center text-white">LabIS is a web-based, role-based laboratory management information that helps private laboratories manage samples, data, and workflows.</p>
            </div>
            <div className=" text-white">
              <h2 className=" text-2xl text-white text-center">LabIS</h2>
              <p>&copy; 2024 LabIS.All Rights Reserved</p>
            </div>
          </div>
        </div>
        <img src="img/_auth.jpg" alt="" />
      </div>
      
      {isLoading ? <Loading />:<div className={`w-[600px] pb-[14rem] h-min mt-[4rem] relative`}>
      {/* <h2 className=" mt-[1rem] text-center text-2xl font-extrabold"><span>Lab<span>IS</span> </span></h2> */}
      <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-black text-white m-auto">
      <LockOutlinedIcon />
      </div>

      {currentPage?.value==="clerk" || currentPage?.value==="technician" || currentPage?.value==="employer" ? <p className=" font-bold text-center text-blue-600">Welcome to LabIS</p>:<p className="font-bold text-center text-blue-600">Select A Sign In Mode To Begin With</p>}

    <div className=" w-max h-max absolute top-[7rem] right-3">
    <Select
        placeholder="Select loggin in mode"
        data={[{ value: 'technician', label: 'Log in as technician' },{ value: 'clerk', label: 'Log in as clerk' }, { value: 'employer', label: 'Log in as Employer' }]}
        value={currentPage ? currentPage.value : null}
        onChange={(_value, option) => {setCurrentPage(option); console.log("option=", option, "\n","value=",_value)}}
        allowDeselect={false}
        />
    </div>
    <small className=" absolute bottom-6 left-4"> Don't have account? Sign up <span className=" text-blue-500 hover:underline text-left cursor-pointer" onClick={()=>window.location.href="/register"}>here</span></small>
        {currentPage?.value ==="clerk" && <h3 className=" text-center">Sign In as a Clerk</h3>}
        {currentPage?.value ==="technician" && <h3 className=" text-center">Sign In as a Technician</h3>}
        {currentPage?.value ==="employer" && <h3 className=" text-center">Sign In as a Employer</h3>}
    {currentPage?.value ==="clerk" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        
        <form onSubmit={onFormSubmit} className=" w-[80%] m-auto mt-[3rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
            <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            <small className=" text-blue-500 hover:underline text-underline text-right cursor-pointer" onClick={()=>window.location.href="/pwdResetRequest"}>I have forgot my password?</small>
          <button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Login</button>
          <small className=""> Don't have account? Sign up <span className=" text-blue-500 hover:underline text-left cursor-pointer" onClick={()=>window.location.href="/register"}>here</span></small>
        </form>
      </div>
      
    </div>}
    {currentPage?.value ==="technician" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        
        <form onSubmit={onFormSubmit} className=" w-[80%] m-auto mt-[3rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
            <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            <small className=" text-blue-500 hover:underline text-underline text-right cursor-pointer" onClick={()=>window.location.href="/pwdResetRequest"}>I have forgot my password?</small>
          <button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Login</button>
          <small className=""> Don't have account? Sign up <span className=" text-blue-500 hover:underline text-left cursor-pointer" onClick={()=>window.location.href="/register"}>here</span></small>
        </form>
      </div>
    </div>}
    {currentPage?.value ==="employer" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        <form onSubmit={onFormSubmit} className=" w-[80%] m-auto mt-[3rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
            <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            <small className=" text-blue-500 hover:underline text-underline text-right cursor-pointer" onClick={()=>window.location.href="/pwdResetRequest"}>I have forgot my password?</small>
          <button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Login</button>
          <small className=""> Don't have account? Sign up <span className=" text-blue-500 hover:underline text-left cursor-pointer" onClick={()=>window.location.href="/register"}>here</span></small>
        </form>
      </div>
    </div>}
      </div>}
    </div>
  );
};



