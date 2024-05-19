import React, { useEffect } from 'react'
import { Navigation } from './components/Navigation'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Login } from './components/perfectlab/auth/Login'
import Aside from './components/Aside'
import MyDashboard from './components/perfectlab/clerk/MyDashboard'
import FindAppointment from './components/perfectlab/FindAppointment'
import BookAppointment from './components/perfectlab/clerk/BookAppointment'
import AddNewClient from './components/perfectlab/clerk/AddNewClient'
import MyAppointment from './components/perfectlab/MyAppointment'
import '@mantine/core/styles.css';
import ProtectedLayout from './components/perfectlab/ProtectedRoutes'
import DefaultLayout from './components/perfectlab/DefaultRoutes'
import { setTimeout } from 'timers'
import { useIdle } from '@mantine/hooks'
import PwdResetReq from './components/perfectlab/auth/PwdResetReq'
import { Register } from './components/perfectlab/auth/Register'


const App = () => {
  const userIsIdle = useIdle(1800000)
  
  useEffect(()=>{
    
      // setInterval(()=>{
      //   localStorage.removeItem("access_token_f")
      // }, 28800000)
  },[])
  return (
    <div className="app relative flex gap-2">
    <Aside />
    <div className=' h-[100vh] w-[60%] mt-[1rem]' style={{width:"6"}}>
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
        <Route path="/register" element={<Register />} />
        <Route path="/pwdResetRequest" element={<PwdResetReq />} />
        </Route>
      </Routes>
    </Router>
    </div>
    </div>
  )
}

export default App