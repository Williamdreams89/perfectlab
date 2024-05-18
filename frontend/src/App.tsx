import React, { useEffect } from 'react'
import { Navigation } from './components/Navigation'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Login } from './components/Login'
import Aside from './components/Aside'
import MyDashboard from './components/perfectlab/MyDashboard'
import FindAppointment from './components/perfectlab/FindAppointment'
import BookAppointment from './components/perfectlab/BookAppointment'
import AddNewClient from './components/perfectlab/AddNewClient'
import MyAppointment from './components/perfectlab/MyAppointment'
import '@mantine/core/styles.css';
import ProtectedLayout from './components/perfectlab/ProtectedRoutes'
import DefaultLayout from './components/perfectlab/DefaultRoutes'


const App = () => {
  
  useEffect(()=>{
      setInterval(()=>{
        localStorage.removeItem("access_token_f")
      }, 600000)
  },[])
  return (
    <>
    <div className="app relative flex gap-2">
    <Aside />
    <div className=' h-[98%] mt-[1rem]' style={{minWidth:"500px"}}>
    <Router>
      <Routes>
        <Route element={<ProtectedLayout />}>
        <Route path='/' element={<MyDashboard  />} />
        <Route path='/myAppointments' element={<MyAppointment />} />
        <Route path='/findAppointment' element={<FindAppointment />} />
        <Route path='/addNewAppointment' element={<BookAppointment />} />
        <Route path='/addNewClient' element={<AddNewClient />} />
        </Route>
        <Route element={<DefaultLayout />}>
        <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
    </div>
    </div>
    </>
  )
}

export default App