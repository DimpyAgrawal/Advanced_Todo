import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
  const notify1 = () => toast.success('Password Forgot Successfully');
  const notify2 = (msg) => toast.info(msg);
  const notify3 = (msg) => toast.error(msg);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const onHandleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    axios
      .post('http://localhost:8080/forgotPassword', { email })
      .then((response) => {
        console.log(response.data);
       notify1();
        navigate('/signin');
        console.log('login');
      })
      .catch((error) => {
        notify3();
        console.log('not login');
        console.log('error ', error);
      });
  };

  return (
    <div>
      <div className='flex w-[100vw] h-[92vh] bg-slate-200'>
        <div className='flex flex-col bg-white m-auto w-[90%] sm:w-[75%] md:w-[35%] border-2 border-gray-300 rounded-md p-6 space-y-3'>
          <h1 className='font-bold text-2xl'>Forgot Password</h1>
          <p>Your Email</p>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Fix the onChange handler
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='name@company.com'
            required=''
          />
          <button
            type='button'
            className='bg-blue-700 w-[50%] md:w-[30%] sm:[50%] p-2 rounded text-white'
            onClick={(e) => onHandleSubmit(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
