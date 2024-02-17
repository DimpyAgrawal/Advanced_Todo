import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './component/SignIn'
import SignUp from './component/SignUp'
import Home from './component/Home'
import Navbar from './component/Navbar';
import ForgotPassword from './component/ForgotPassword'
import ResetPassword from './component/ResetPassword';
import VerifyEmail from './component/VerifyEmail';


import { ToastContainer } from 'react-toastify'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/forgotpassword' element={<ForgotPassword />} />
          <Route exact path='/verifyEmail/:token' element={<VerifyEmail />} />
          <Route exact path='/resetpassword/:token' element={<ResetPassword />} />
          

      
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
