import axios from "axios";
import { useState } from "react";
import { ComboboxItem, Notification, Select, TextInput, rem, Checkbox } from "@mantine/core";
import Loading from "../common/Loading";
import { IconCheck } from "@tabler/icons-react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


export const Register = () => {
  
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<ComboboxItem | null>(null)

  const [isError, setIsError] = useState(false)

  const onFormSubmitForClerk = async (event:any) => {
    event.preventDefault()
    try{
      setIsLoading(true)
      const {data} = await axios.post("https://perfectlab-backend.onrender.com/user/labclerk/register/", {email:email, password:password, first_name:firstName, last_name:lastName, is_clerk:true})
      console.log(data)
    }catch(err){
      setIsLoading(false)
      setIsError(true)
      console.log("error login: ", err)
    }
  
  }
  const onFormSubmitForLabTech = async (event:any) => {
    event.preventDefault()
    try{
      setIsLoading(true)
      const {data} = await axios.post("https://perfectlab-backend.onrender.com/user/labtech/register/", {email:email, password:password, first_name:firstName, last_name:lastName, is_lab_technician:true})
      console.log(data)
    }catch(err){
      setIsLoading(false)
      alert("Something went wrong")
      console.log("error login: ", err)
    }
  
  }
  const onFormSubmitForEmployer = async (event:any) => {
    event.preventDefault()
    try{
      setIsLoading(true)
      const {data} = await axios.post("https://perfectlab-backend.onrender.com/user/employer/register/", {email:email, password:password,  first_name:firstName, last_name:lastName, is_employer:true})
    }catch(err){
      setIsLoading(false)
      console.log({"first_name":firstName, "last_name":lastName})
      alert("Wrong username or password")
      console.log("error login: ", err)
    }
  
  }

  const firsNameChange = (e:any)=>{
    e.preventDefault()
    setFirstName(e.target.value)
  }
  const lastNameChange = (e:any)=>{
    e.preventDefault()
    setLastName(e.target.value)
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
    <div className="flex gap-[5rem] w-[100vw] h-[100vh] absolute bg-white z-50 left-0 top-0">
      <div className=" authLeftBox w-[25vw]  h-[100%] relative">
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
      {isError &&<Notification icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />} color="teal" title="All good!" mt="md">
        Everything is fine
      </Notification>}
      {isLoading ? <Loading />:<div className={`w-[600px] pb-[14rem] h-min mt-[1rem] relative`}>
      {/* <h2 className=" mt-[1rem] text-center text-2xl font-extrabold"><span>Lab<span>IS</span> </span></h2> */}
      <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-black text-white m-auto">
      <LockOutlinedIcon />
      </div>

      {currentPage?.value==="clerk" || currentPage?.value==="technician" || currentPage?.value==="employer" ? <p className=" font-bold text-center text-blue-600">Welcome to LabIS</p>:<p className="font-bold text-center text-blue-600">Select A Sign Up Mode To Begin With</p>}

    <div className=" w-max h-max absolute top-[8rem] right-3">
    <Select
        placeholder="Select Sign up mode"
        data={[{ value: 'technician', label: 'Sign up in as Technician' },{ value: 'clerk', label: 'Sign up in as Clerk' }, { value: 'employer', label: 'Sign up in as Employer' }, {value: "none", label:"nothing"}]}
        value={currentPage ? currentPage.value : null}
        onChange={(_value, option) => {setCurrentPage(option); console.log("option=", option, "\n","value=",_value)}}
        allowDeselect={false}
        />
    </div>
    <small className=" absolute bottom-6 left-4"> I already have an account. Sign in <span className=" text-blue-500 hover:underline text-left cursor-pointer" onClick={()=>window.location.href="/login"}>here</span></small>

        {currentPage?.value ==="clerk" && <h3 className=" text-center">Sign up as a Clerk</h3>}
        {currentPage?.value ==="technician" && <h3 className=" text-center">Sign up as a Technician</h3>}
        {currentPage?.value ==="employer" && <h3 className=" text-center">Sign up as a Employer</h3>}
    {currentPage?.value ==="clerk" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        
        <form onSubmit={onFormSubmitForClerk} className=" w-[80%] m-auto mt-[3rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
            <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="First Name" withAsterisk type="text" onChange={firsNameChange}/>
            <TextInput label='Last Name' withAsterisk type="text" onChange={lastNameChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            
          <small className="text-blue-500 hover:underline text-left cursor-pointer"> Don't have account? Sign in <span className="text-blue-500 hover:underline cursor-pointer" onClick={()=>window.location.href="/login"}>here</span></small>
          {<button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Sign Up</button>}
        </form>
      </div>
      
    </div>}
    {currentPage?.value ==="technician" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        
        <form onSubmit={onFormSubmitForLabTech} className=" w-[80%] m-auto mt-[3rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
          <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="First Name" withAsterisk type="text" onChange={firsNameChange}/>
            <TextInput label='Last Name' withAsterisk type="text" onChange={lastNameChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            
          {<button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Sign Up</button>}
          <small className=" text-left "> Don't have account? Sign in <span className="text-blue-500 hover:underline cursor-pointer" onClick={()=>window.location.href="/login"}>here</span></small>
        </form>
      </div>
    </div>}
    {currentPage?.value ==="employer" &&<div className="">
        
      <div className="w-[90%] lg:w-[40vw]">
        <form onSubmit={onFormSubmitForEmployer} className=" w-[80%] m-auto mt-[3rem] h-[80%] flex flex-col gap-[2rem]">
          <div className=" w-[95%] m-auto">
            <TextInput label='Email' withAsterisk type="email" onChange={emailChange} />
            <TextInput label="First Name" withAsterisk type="text"  onChange={firsNameChange}/>
            <TextInput label='Last Name' withAsterisk type="text"  onChange={lastNameChange} />
            <TextInput label="Password" withAsterisk type="password" onChange={passwordChange}/>
            </div>
            
          <small className="text-blue-500 hover:underline text-right cursor-pointer"> Don't have account? Sign in <span className="text-blue-500 hover:underline cursor-pointer" onClick={()=>window.location.href="/login"}>here</span></small>
          {<button type="submit" className="bg-blue-500 p-2 rounded-lg no-underline text-white">Sign Up</button>}
        </form>
      </div>
    </div>}
      </div>}
    </div>
  );
};



