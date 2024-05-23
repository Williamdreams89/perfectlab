import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Notifications from '@mui/icons-material/Notifications';
import DefaultLayout from './components/perfectlab/auth/DefaultRoutes';
import { Login } from './components/perfectlab/auth/Login';
import { Register } from './components/perfectlab/auth/Register';
import PwdResetReq from './components/perfectlab/auth/PwdResetReq';
import _App from './_App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider>
    <Router>
      <Routes>
        <Route path="/" index element = {<_App />} />
        <Route element={<DefaultLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pwdResetRequest" element={<PwdResetReq />} />
        </Route>
      </Routes>
    </Router>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
