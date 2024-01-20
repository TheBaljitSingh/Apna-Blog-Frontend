import React from 'react'
// import {  useNavigate } from 'react-router-dom';
import Nav from './Nav';



function View(props) {

    const {title, description, author} = props;
    console.log(title);
    console.log(description);
    console.log(author);


  //  const navigate = useNavigate();  

   if(!title && !description && !author){
    return (
        <div>
            <Nav/>
      
        <div className='flex justify-center items-center w-screen h-screen '>
            <p className='text-center'>Sorry, sabar karo dheere dheere ye bhi ho jayega ki tum link se access kar pao 🙃</p>
            
        </div>
        </div>
    )
   }

   return (
      
        <div>
        <Nav/>

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


          {/* <footer className='w-screen bg-teal-400 h-12 fixed bottom-0 left-0 flex justify-center items-center '>
          <p className='flex justify-center '>Baljit Singh</p>
        </footer> */}
        </div>
   )



    

 
}

export default View