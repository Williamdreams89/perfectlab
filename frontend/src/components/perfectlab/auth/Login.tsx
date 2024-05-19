import axios from "axios";
import { Navigate } from "react-router-dom";
import { FormEventHandler, useState } from "react";
import GoogleLogin from "react-google-login";
import { ComboboxItem, Input, NativeSelect, Select, TextInput } from "@mantine/core";
import Loading from "../Loading";


export const Login = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<ComboboxItem | null>(null)

  

  const onFormSubmit = async (event:any) => {
    event.preventDefault()
    try{
      setIsLoading(true)
      const {data} = await axios.post("https://perfectlab-backend.onrender.com/user/login/", {email:email, password:password})
      console.log(data, data["tokens"]["access_token"])
      localStorage.clear()
      localStorage.setItem("access_token_f", data["tokens"]["access_token"])
      window.location.href = "/"
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
      {isLoading ? <Loading />:<div className={`w-[600px] pb-[14rem] h-min mt-[4rem] relative`} style={{border:"2px solid rgba(107, 114, 128, .2)"}}>
      <h2 className=" mt-[1rem] text-center text-2xl font-extrabold"><span>Perfect<span>Lab</span> </span></h2>

    <div className=" w-max h-max absolute top-[6rem] right-3">
    <Select
        placeholder="Select loggin in mode"
        data={[{ value: 'technician', label: 'Log in as technician' },{ value: 'clerk', label: 'Log in as clerk' }, { value: 'employer', label: 'Log in as Employer' }]}
        value={currentPage ? currentPage.value : null}
        onChange={(_value, option) => {setCurrentPage(option); console.log("option=", option, "\n","value=",_value)}}
        allowDeselect={false}
        />
    </div>
        {currentPage?.value ==="clerk" && <h3 className=" text-center">Sign In as a Clerk</h3>}
        {currentPage?.value ==="technician" && <h3 className=" text-center">Sign In as a Technician</h3>}
        {currentPage?.value ==="employer" && <h3 className=" text-center">Sign In as a Employer</h3>}
    {currentPage?.value ==="clerk" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        
        <form onSubmit={onFormSubmit} className=" w-[80%] m-auto mt-[6rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
            <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            <small className=" text-blue-500 hover:underline text-underline text-right cursor-pointer" onClick={()=>window.location.href="/pwdResetRequest"}>I have forgot my password?</small>
          <button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Login</button>
          <small className=""> Don't have account? Sign in <span className=" text-blue-500 hover:underline text-left cursor-pointer" onClick={()=>window.location.href="/register"}>here</span></small>
        </form>
      </div>
      
    </div>}
    {currentPage?.value ==="technician" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        
        <form onSubmit={onFormSubmit} className=" w-[80%] m-auto mt-[6rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
            <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            <small className=" text-blue-500 hover:underline text-underline text-right cursor-pointer" onClick={()=>window.location.href="/pwdResetRequest"}>I have forgot my password?</small>
          <button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Login</button>
          <small className=""> Don't have account? Sign in <span className=" text-blue-500 hover:underline text-left cursor-pointer" onClick={()=>window.location.href="/register"}>here</span></small>
        </form>
      </div>
    </div>}
    {currentPage?.value ==="employer" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        <form onSubmit={onFormSubmit} className=" w-[80%] m-auto mt-[6rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
            <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            <small className=" text-blue-500 hover:underline text-underline text-right cursor-pointer" onClick={()=>window.location.href="/pwdResetRequest"}>I have forgot my password?</small>
          <button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Login</button>
          <small className=""> Don't have account? Sign in <span className=" text-blue-500 hover:underline text-left cursor-pointer" onClick={()=>window.location.href="/register"}>here</span></small>
        </form>
      </div>
    </div>}
      </div>}
    </div>
  );
};



