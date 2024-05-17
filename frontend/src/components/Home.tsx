import React, { useState } from 'react'
import axios from "axios"

const Home = () => {
    const [users, setUsers] = useState([])
    const fetch = async () => {
        await axios.get("http://localhost:8000/user/", {headers:{Authorization:`Bearer `}})
    }
  return (
    <div> <h2 className=' w-[800px]'>Home</h2></div>
  )
}

export default Home