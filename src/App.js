import React, { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Contact from "./Contact";
import Login from "./Login";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import About from "./About";
import Home from "./Home"
import Dashboard from "./Dashboard";
import { BlogDetail } from './page/BlogDetail';
import CreateBlogPost from "./CreateBlogPost"
import BlogList from './page/BlogList';
import SearchResult from "./components/searchResult"


export default function App(){


  // const[token, setToken] = useState();

  // console.log(process.env.REACT_APP_BACKEND_URL);


    // const token = document.cookie;
    // console.log("ye token hai " +token);
    
  return (
  
     
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route  path="/About" element={<About title="ABOUT" />} />
         <Route  path="/Contact" element={<Contact title="CONTACT TO ADMIN" />} />
        <Route path="/auth" element={<Login/>} />
        <Route path="/create" element={ <CreateBlogPost/>}/>

        <Route path="/Dashboard" element={<ProtectedRoute> <Dashboard/></ProtectedRoute>}/>
        {/* <Route path='/Dashboard' element={<Dashboard/>} /> */}
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/blog"  element={<BlogList/>}/>
        <Route path="/search"  element={<SearchResult/>}/>

        


       </Routes>
     </BrowserRouter>

  )
  
}
