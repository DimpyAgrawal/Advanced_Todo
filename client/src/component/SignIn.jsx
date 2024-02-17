import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignIn() {
    const notify1 =()=>toast.success('SignIn Successfully');
    const notify2 =(msg)=>toast.info(msg);
    const notify3 =(msg)=>toast.error(msg);
    const initialValue={
      email:'',
      password:''
    }
    
    const navigate = useNavigate();
    const[userData,setUserData] = useState(initialValue);
    const{email,password} = userData;
  
    const onChangeValue=(e)=>{
      setUserData({...userData,[e.target.name]:e.target.value})
    }
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    const onHandleSubmit=(e)=>{
      axios.post('http://localhost:8080/login',userData)
      .then(response=>{
        console.log(response.data);
        const{name,email,id} = jwt_decode(response.data.data);
        // window.location.reload();
        localStorage.setItem('token',response.data.data);
        localStorage.setItem('id',id);
        localStorage.setItem('name',name);
        localStorage.setItem('email',email);
        localStorage.setItem('loggedin',true);
        setIsLoggedIn(true);
        notify1();
        navigate('/');
  
        console.log('login');
      }).catch(error=>{
        notify3();
        console.log('not login');
        console.log('error ',error);
      })
    }
  
    const handlesignup=() =>{
      navigate('/signup');
    }
    const handleForgotPassword = () => {
      navigate('/forgotpassword');
    };
    return (
      <div className='flex flex-col w-[100%] h-[96vh] bg-slate-200'  >
        <div  className='flex w-[60%] h-[70%]  bg-white shadow-2xl m-auto p-8 rounded-md'>
          <div className='w-[100%] md:w-[50%] m-auto  mt-0  '>
            <div className=' w-[100%] md:w-[90%]  '>

            <h1 className='font-bold text-2xl mb-5'>Login</h1>
            <p>Your Email</p>
            <input type="email" name="email" id="email" value={email} onChange={(e) => onChangeValue(e)} class="bg-gray-50 border mb-5 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
            <p>Password</p>
            
            <input type="password" name="password" id="password" value={password} placeholder="••••••••" onChange={(e) => onChangeValue(e)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            <div className='flex justify-between'>

            <p className='flex text-xs  w-[100%] mt-3  text-blue-500' onClick={handlesignup}> SignUp</p>
            <p className='flex text-xs justify-end w-[100%] mt-3  text-blue-500  ' onClick={handleForgotPassword}>Forgot Password?</p>
            </div>
            <button type="button" className=' p-1 rounded-md text-white font-semibold mt-8 bg-blue-500 w-[100%] m-auto' onClick={(e) => onHandleSubmit(e)}>Sign In</button>
            </div>
  
          </div>
          <div className='w-0  md:w-[80%]'>
            <img className=' md:h-[90%] invisible	 md:visible  ' src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="" />
          </div>
        </div>
  
     
  
  
      </div>
    )
}
