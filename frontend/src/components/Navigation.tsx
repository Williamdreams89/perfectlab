import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import { Box, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';

export const Navigation = () => {
  const [authData, setAuthdata] = useState<any>()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  useEffect(() => {
    const fetchData = async () => {
      const api_token = localStorage.getItem("access_token_f");
      if (api_token) {
        const { data } = await axios.post("http://localhost:8000/user/check_token_exp/", { token: api_token });
        setAuthdata(data);
      }
    };

    fetchData();

    setInterval(fetchData, 1000);
    // return () => clearInterval(intervalId);
  }, []); 
  return (
    <div className=' flex justify-around items-center h-[7rem]'>
        <h4>Blog.py</h4>
        <ul className='flex justify-around items-center gap-10 h-[100%]'>
            <li><Link to='/'>Home</Link></li>
            <li>Blog</li>
        </ul>

        {!authData ?<div className="socials flex justify-around gap-10 items-center h-[100%]">
            <Link to="/login" className=' bg-blue-500 p-3 rounded-lg no-underline text-white'> Login</Link>
            
            <Link to="" className=' outline-stone-600 rounded-lg no-underline text-black hover:bg-blue-500 p-3 hover:text-white' style={{border:"1px solid rgba(9, 130, 246, 0.2)"}}>Signup</Link>
        </div>:<div className=' flex justify-around gap-10 items-center h-[100%]'>
                <p>{authData?.first_name}</p>
                <a href="" className=' outline-stone-600 rounded-lg no-underline text-black hover:bg-blue-500 p-3 hover:text-white' style={{border:"1px solid rgba(9, 130, 246, 0.2)"}} onClick={()=>{localStorage.removeItem("access_token_f")}}>Logout</a>
            </div>}

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />

    </div>
  )
}
