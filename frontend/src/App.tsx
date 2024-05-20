import React, { useEffect } from 'react'
import { Navigation } from './components/Navigation'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Login } from './components/perfectlab/auth/Login'
import Aside from './components/Aside'
import MyDashboard from './components/perfectlab/clerk/MyDashboard'
import FindAppointment from './components/perfectlab/common/FindAppointment'
import BookAppointment from './components/perfectlab/clerk/BookAppointment'
import AddNewClient from './components/perfectlab/clerk/AddNewClient'
import MyAppointment from './components/perfectlab/common/MyAppointment'
import '@mantine/core/styles.css';
import DefaultLayout from './components/perfectlab/auth/DefaultRoutes'
import { setTimeout } from 'timers'
import { useIdle } from '@mantine/hooks'
import PwdResetReq from './components/perfectlab/auth/PwdResetReq'
import { Register } from './components/perfectlab/auth/Register'
import ProtectedLayout from './components/perfectlab/auth/ProtectedRoutes'


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
    <div className=' h-[100vh] w-max  mt-[1rem]'>
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