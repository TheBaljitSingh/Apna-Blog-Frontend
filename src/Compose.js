import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import Nav from "./Nav";
import { useDispatch, useSelector } from 'react-redux';
import store from "./store";



function Compose(){

    

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [ email, setEmail] = useState("");
  const [role, userRole] = useState("");
  
  const [display, setDisplay] = useState("")
  const [isDropdown, setisDropdown] = useState(false);
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state=>state.custom);


  console.log(display);
  const logoutBtn = ()=>{

    // i have changed this post request to get request
    const token = document.cookie;

    axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/logout`,{token})
    .then(res=>{
      console.log(res);
      if(res.status===200){
        console.log("server se logout hua");
        
        // cookies.remove('Token');
        // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/Dashboard;";
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';


        Swal.fire({
          title:"ok!",
          text:"successfully Sign Out",
          icon:"success"
      });
      setTimeout(()=>{
        window.location.reload();
    },2000)



      }
    })


    // store.dispatch({
    //   type: "checkLogout",
    //   payload:false,
    // })
  }


    const handleSubmit = async (e)=>{
        e.preventDefault();
        setTitle("");
        setDescription("");
        setDisplay("");        
        // now making axios post request
        const token = document.cookie;

    await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/compose`,{token, title, description, display})
    .then(res =>{
        if(res.data.post){
            // alert("Form is saved");
            Swal.fire({
                title: "Good job!",
                text: "Your Journal is saved",
                icon: "success"
              });
        }
        
    })
    .catch(error =>{
        console.log(error);
    })


    }

    const handleClick = ()=>{
        setisDropdown(!isDropdown);
    }

    const fetctInfo = async ()=>{

      const token = document.cookie;
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/userJournal`, {token})
              .then(res=>{
                console.log("aa gya response");
                if(res.status==200 || res.status==201){
                
                  const {name, email,role} = res.data.user;
                  setUser(name);
                  setEmail(email);
                  userRole(role);
  
                }
                
               
            })
            .catch((e)=>{
                console.log(e.message);
            })
              
      }

    
    useEffect(()=>{
        // handleClick();
        fetctInfo();        
      },[])

   
    



    return (
        <div>
            <div>

            <Nav/>
             {/* profile wala main div */}
          <div className="relative hover:cursor-pointe ">
          <div className="absolute top-1 right-1  " >
          {/* <  FaRegCircleUser className="cursor-pointer" size={30} /> */}
          
            <button onClick={handleClick}  id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className=" z-50 ml-12 flex items-center text-sm pe-1 font-medium text-gray-900 outline-none  hover:cursor-pointer hover:text-gray-600 focus:ring-gray-100" type="button">
            <span class="sr-only">Open user menu</span>
              <div>
              <FaRegCircleUser  size={30} />
              </div>
            <div className="ml-2" >{user}</div>
            <svg class=" w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            
            
            {isDropdown==true? <div id="dropdownAvatarName" class="z-52 shadow-xl   bg-white divide-y divide-gray-300 rounded-lg  w-44 ">
                <div class="px-4 py-3 text-sm text-gray-900 ">
                  <div class="font-medium ">{role}</div>
                  <div class="truncate">{email}</div>
                </div>
                <ul class="py-2 text-sm text-gray-700  " aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                  <li className=" hover:bg-gray-200 ">
                    {/* <a href="#" class="block px-4 py-2  "></a> */}
                    <Link to="/Dashboard" > <a href="" class="block px-4 py-2 hover:bg-gray-200">Posts</a></Link>

                  </li>
                  <li className="mt-1 bg-gray-200 hover:bg-gray-100 ">
                    <Link to="/Dashboard/compose" > <a href="" class="block px-4 py-2 ">Compose</a></Link>
                  </li>
                  
                </ul>
                <div class="py-2">
                  <a onClick={logoutBtn} href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ">Sign out</a>
                </div>
            </div>:null }
            <div>
            </div>

          </div>
          </div>

            <div className="ml-52 mt-16 w-3/4 ">
                <form onSubmit={handleSubmit}>
                    <p>Heading</p>
                    <input onChange={(e) =>setTitle(e.target.value)} value={title}   id="title" type="text" className="rounded-lg border border-gray-300 w-full h-10 bg-gray-50 p-2 mt-1 " placeholder="Write your Title here..." />
                    <p className="mt-2" >Descricption</p>
                    <textarea onChange={e =>setDescription(e.target.value)} value={description} id="Descricption" rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your Descricption here..."></textarea>
                    
                    <div className="flex flex-row space-x-5 mt-2">
                    <div class="flex items-center ">
                        <input  id="default-radio-1"  onClick={(e)=>setDisplay("public")} type="radio" value={display} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                        <label for="default-radio-1"  class="ms-2 text-sm font-medium text-gray-900 ">Public</label>
                    </div>
                    <div class="flex items-center">
                        <input  id="default-radio-2" type="radio" onClick={(e)=>setDisplay("private")}  value={display} name="default-radio" class="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 "/>
                        <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900">Private</label>
                    </div>
                    </div>

                    <button type="submit" className="rounded-lg border-2 border-gray-300 w-20 h-12 mt-2 " >Publish</button>
                </form>
            </div>

            {/* <footer className='w-screen bg-teal-400 h-12 fixed bottom-0 left-0 flex justify-center items-center '>
            <p className='flex justify-center '>Created By Baljit Singh</p>
        </footer> */}

            </div>

        
                
        </div>
    )
}

export default Compose;