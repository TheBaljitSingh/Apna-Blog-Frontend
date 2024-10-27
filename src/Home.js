import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Stopwatch from "./Stopwatch";


export default function Home() {
    const navigate = useNavigate();
    const token = Cookies.get('token');


  useEffect(()=>{
    if(token){
      navigate("/Dashboard");
    }
  },[navigate])


    return (
      <div >
        <Nav/>
        {/* <Stopwatch/> */}
        <div className="grid grid-cols-12 gap-6 py-12 px-4 md:px-8">
      {/* Empty column for spacing on small screens */}
      <div className="col-span-12 md:col-span-1"></div>

      {/* Text Content */}
      <div className="col-span-12 md:col-span-6 flex flex-col items-center md:items-start justify-center">
        <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-center md:text-left mb-4">
          Start Your Blogging Journey Now!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 text-center md:text-left">
          Discover the latest trends, share your thoughts, and connect with a community of passionate bloggers.
        </p>
      </div>


      <div className="col-span-12 md:col-span-3 flex items-center justify-center">
        <img
          className="w-full max-w-[90%] sm:max-w-[75%] md:max-w-[100%] lg:max-w-md rounded-lg shadow-lg"
          src="https://thesavvycouple.com/wp-content/uploads/2018/09/Best-Stock-Photo-Sites.jpg"
          alt="Blogging"
        />
      </div>

      {/* Signup and login buttons */}
      </div>
        
      
      </div>
    )      
      

  }

