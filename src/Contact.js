import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react";
import Nav from "./Nav";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Contact(props){

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setName("");
    setEmail("");
    setMessage("");


    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/send-mail`,{name, email, message})
    .then(res=>{
      if(res.data.code===200){

        toast.success("Your Message Sent",{
          position: "bottom-center"
        })

        setTimeout(()=>{
          window.location.reload();
        },3000)
      }
      
    })
    .catch(error =>{
      console.error(error);
    })
  }

    return(
        <div>
        <div>
        <Nav/>

          <div className='ml-52 mt-8 w-3/4'>
            <h1 className='text-2xl font-medium'>{props.title}</h1>
          </div>

          <div className="ml-52 mt-8 w-3/4 ">

            <form  onSubmit={handleSubmit} >
               
                <label for="website-admin" class="font-medium block mb-2 text-sm text-gray-900 ">Name</label>
                <div class="flex mb-2">
                  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md ">
                    <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                  </span>
                  <input autoFocus  type="text" id="name" onChange={(e)=>{setName(e.target.value)}} class="bg-opacity-20 rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  " placeholder="your name"/>
                </div>
                <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <div class="relative mb-2">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>
                  </div>
                  <input type="email" onChange={(e)=>{setEmail(e.target.value)}} id="email" class="bg-opacity-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  " placeholder="your-name@email.com"/>
                  
                  
                </div>
                <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 ">Message</label>
                <textarea id="message"  onChange={(e)=>{setMessage(e.target.value)}} rows="10" class=" bg-opacity-20 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your Descricption here..."></textarea>
                
                <div className=" relative mt-2">
                <button type="submit" class="bg-slate-700  px-5 py-3 text-base font-medium text-center text-white rounded-lg  outline-none ">Send</button>

                </div>

                



            </form>

          </div>


          {/* <footer className='w-screen bg-teal-400 h-12 fixed bottom-0 left-0 flex justify-center items-center '>
          <p className='flex justify-center '>Baljit Singh</p>
        </footer> */}
        </div>
        <ToastContainer/>
    </div>
    )
   
}

