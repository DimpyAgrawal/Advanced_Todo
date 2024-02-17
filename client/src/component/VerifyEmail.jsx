import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyEmail() {
    const notify1 = () => toast.success('Email verified Successfully');
    const notify2 = (msg) => toast.info(msg);
    const notify3 = (msg) => toast.error(msg);
    const navigate = useNavigate();

    const {token} = useParams();
    console.log(token+' token inside verifyemail page');

//    const onHandleSubmit =(e)=>{
//         e.preventDefault();
//         try{
//           const response = axios.get('http://localhost:8080/verifyEmail/'+token)
//             console.log(response.data);
//             notify1();

            

//         }catch(error){
//             notify3();
//             console.log('error in verifying email');
//         }
//     }
//     useEffect(()={
//         onHandleSubmit();

//     },[])

useEffect(() => {
    const onHandleSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:8080/verifyEmail/' + token);
            console.log(response.data);
            notify1();
        } catch (error) {
            notify3();
            console.log('Error in verifying email:', error);
        }
    };

    onHandleSubmit(); // Call the function here

}, []); // Use empty dependency array to run this effect only once on component mount

  return (
    <div>
      <div className='flex w-[100vw] h-[92vh] bg-slate-200'>
        <div className='flex flex-col bg-white m-auto w-[90%] sm:w-[75%] md:w-[35%] border-2 border-gray-300 rounded-md p-6 space-y-3'>
          <h1 className='font-bold m-auto text-2xl'>Email Verified</h1>

            
         
          <button
            type='button'
            className='bg-green-700 m-auto  w-[50%] md:w-[30%] sm:[50%] p-2 rounded text-white'
            onClick={()=>{navigate('/signin')}}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
