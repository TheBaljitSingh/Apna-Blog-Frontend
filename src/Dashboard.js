import axios from "axios";
import { useEffect, useState } from "react";
// import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

// import { MdLockOutline,MdLockOpen} from "react-icons/md";
import Nav from "./Nav";
// import { MdDelete } from "react-icons/md";
import { ToastContainer,toast } from "react-toastify";
import Cookies from "js-cookie";
import {BlogCard} from "./components/BlogCard";







export default function Dashboard(){


    // Handle a simple update for demonstration
   

    const logoutBtn = ()=>{

      // i have changed this post request to get request
      const token = Cookies.get('token');

      axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/logout`,{token})
      .then(res=>{
        console.log(res);
        if(res.status===200){
          console.log("server se logout hua");
          
          Cookies.remove('token');
      //     // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/Dashboard;";
      //     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // Cookies.remove('token');

            toast.success('Successfully Logout! Redirect to Home...', {
              position: "bottom-center",
              onClose: () => navigate('/')
            }
          );


      //   // setReloadFlag(!reloadFlag);
 
        }
      })
      .catch(error=>{
        console.log(error);
        toast.error("error while logout",{
          position: "bottom-center",
        })
      })


    }
 



  const navigate = useNavigate();
  // const [reloadFlag, setReloadFlag] = useState(false);


  // const [date, setDate] = useState();

  // var moment = require('moment');



  //   const [isDropdown, setisDropdown] = useState(true);
  //   const [article, setArticle] = useState([{}]);
  //   const [email, setEmail] = useState("");
  //   const [role, userRole] = useState("");
  //   const [data, isData] = useState();
    
    
  //   const [userDetail, setUserDetail] = useState();
    
    
  

    
    // const handleClick = ()=>{
    //     setisDropdown(!isDropdown);
    // }




        

    // async function handleDeletePost(id){
    //   console.log("delete wala function call ho raha hai"+id);


    //    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}auth/deletePost`, {
    //     data:{id}
    //   })
    //   .then(res=>{
    //     if(res.status==200){
    //       console.log("delete res"+res.data.deletedPost);
    //       // console.log("delete ho gya");

    //       toast.success("Deleted",{
    //         position: "bottom-center"
    //       })

    
    //     }
    //   })
    //   .catch(e=>{
    //     console.log(e);
    //   })

    // }
            
    
  
    // useEffect(()=>{
      // fetctInfo();
      // handleClick();
      // handleDeletePost();


      // axios.get(`${process.env.REACT_APP_BACKEND_URL}api/blogs`)
      // .then( res=>{
        
      //    setArticle(res.data);


      // })
      
    // },[])




    return(
     
        <div className="">
          <Nav/>
          
          <div className="grid grid-cols-12 ">
            <div className="col-span-12 bg-[#fffff6]">
              <div className="p-12">
                <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold">Baljit Singh</h3>
                <p className="text-3xl hover:cursor-pointer">...</p>
                </div>
              
              <div className="flex gap-4 mt-12">
                <ul className="underline underline-offset-2 hover:cursor-pointer">Home</ul>
                <ul className="hover:cursor-pointer">About</ul>
                <ul className="hover:cursor-pointer">All Blogs</ul>
              </div>
              <div className="after:block mt-2 after:bg-gray-500 after:w-[px] after:h-[1px] after:mx-auto after:my-2">
              {/* <span className="text-gray-400">2021</span> */}
            </div>
              <div className="grid grid-cols-2 md:grid-cols-4 mt-8 h-36 gap-2">
                <BlogCard title={"Title 1"} description={"this is description"} onClick={(e)=>{
                  navigate("/Blog?id=blogId00x")
                }}  blogId={"blogid00x"} /> 
                 <BlogCard title={"Private Blog"} description={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, necessitatibus"}/>
                 <Link to={"/Create"} >
                 <BlogCard title={"Compose Blog"}/>
                 </Link>

              </div>

              </div>


            </div>
          
           
        

          </div>
        
     
          
        <ToastContainer/>
      </div>
 
    )





    
}