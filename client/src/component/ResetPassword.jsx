import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ResetPassword() {

  const notify1 = (msg) => toast.success(msg);
  const notify2 = (msg) => toast.info(msg);
  const {token} = useParams();
 

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
 
  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    axios.post('http://localhost:8080/resetPassword/'+token, {password})
      .then(response => {
        console.log(response.data);
        notify1(response.data.message);
        navigate('/signin');
      }).catch(error => {
        notify2();
        console.log("error" + " " + error);
      })
  }

  return (
    <>
      <div className=' flex w-[100vw] h-[92vh] bg-slate-200 '>
        <div className='flex flex-col bg-white m-auto w-[90%] sm:w-[75%] md:w-[35%] border-2 border-gray-300 rounded-md p-6 space-y-3'>
          <h1 className='font-bold text-2xl'>Reset Passaword</h1>
         
          <p>Password</p>
          <input type="password" name="password" id="password" value={password} placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
          <button type="button" className='bg-blue-700 w-[50%] md:w-[30%] sm:[50%] p-2 rounded text-white' onClick={(e) => onHandleSubmit(e)}>Submit</button>

        </div>
      </div>
    </>
  )
}
