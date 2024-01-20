

import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Compose from "./Compose";
import Contact from "./Contact";
import Login from "./Login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import About from "./About";
import Home from "./Home"
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Blog from "./Blog";
// import {ProtectedRoute, ProtectedLogin} from "./ProtectedRoute/ProtectedRoute"
import View from "./View";




export default function App(){

  // toast.configure();



  const {title, description, authorId} = useSelector(state=>state.custom).data;

  // console.log("authorId redux wala "+ authorId);
  const [authorName, setauthorName] = useState();


  //makig api req for chek user name

    axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/checkName`, {authorId})
    .then(res=>{
      if(res.status==200){
        setauthorName(res.data.name);
        // console.log("ye response aa raha hai"+res.data.name)

      }
    }).catch(e=>{
      console.log(e + "error in authorFunction");
    })
    


  // const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [loginUserDetail, setloginUserDetail] = useState();

  // console.log(isLogin);

  // isLoginFun();
  async function isLoginFun(){
    // console.log("function call ho raha hai");

    const token = document.cookie;
    // console.log("ye token hai " +token);
    
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/isLogin`, {token})
      .then(res=>{
        // console.log(res);
        if(res.status==200){
          // console.log("login wala true kar diya ");
          // console.log(res);
          // token is valid
          // sab sahi hai
          setLogin(true);
          setloginUserDetail(res.data.authUser);

        }
        else if (res.status==202){
          //token diya hi nahi to login nahi hua hai || token is not valid
          setLogin(false);
        }

      })
      .catch(e=>{
        console.log(e);
      })

      //verify the token
      //is valid, is Expired or not
  }
  
  



  useEffect(()=>{
    isLoginFun();
    // authorFunction()
    // setLogin();


  },[])

  // console.log("yeahi to author hai is post ka "+authorName);
  


  const screenWidth = window.innerWidth;

  
 return screenWidth<720?
(<div>
  <h1>Please Use Laptop Screen Resolution</h1>
</div>)
    :
    (
    
    <BrowserRouter>
       <Routes>

         <Route path="/" element={ isLogin? <Dashboard  userData={loginUserDetail?loginUserDetail:"kuch bhi nahi hai data me"} />:<Home/>} />
         <Route path="*" element={<div>404</div>} />
         <Route  path="/about" element={<About title="ABOUT" />} />
         <Route path="/Blog" element={<Blog title="BLOG" />} />
         <Route  path="/contact" element={<Contact title="CONTACT TO ADMIN" />} />
         <Route path="/posts" element={<View title={title} description={description} author={authorName} />} />


        <Route path="/Dashboard" element={ isLogin? <Dashboard  userData={loginUserDetail?loginUserDetail:"kuch bhi nahi hai data me"} />: <Login/>} />
        <Route path="/compose" element={isLogin? <Compose/>: <Login/>} />
        {/* <Route path="/Login" element={isLogin? <Dashboard/>: <Login/>} /> */}

       </Routes>
     </BrowserRouter>
  )
}
