import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import axios from 'axios';



function View(blogId) {

  const [blog, SetBlog] = useState();


    useEffect(()=>{
      axios.get(`${REACT_APP_BACKEND_URL}blogs/:${blogId}`)
      .then(res=>{
        SetBlog(res);

      })

    },[])


  //  const navigate = useNavigate();  

   

   return (
      
        <div>
        <Nav/>
        {/* {blog.map(function(b))} */}
        blog.map(b)
          <div className='ml-52 mt-10 w-3/4'>
            <h1 className='p-2  text-2xl font-semibold text-center  border-black'>{props.title}</h1>

          </div>
          <div>
          <hr class="w-48 h-1 mx-auto my-4 bg-gray-400 border-0 rounded"/>

          </div>
          <div className=" p-2 ml-52 mr-48 text-left font-normal text-xl ">
            <p >Published By - <span className='bg-sky-300 rounded-sm w-2 p-1 font-medium hover:bg-sky-200 hover:cursor-pointer'> {props.author}</span></p>
            {props.description}
          </div>


        </div>
   )


    

 
}

export default View