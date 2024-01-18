import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { MdLockOutline,MdLockOpen } from "react-icons/md";
  // import store from "./store";
// import { useDispatch, useSelector } from 'react-redux';
import Nav from "./Nav";




export default function Dashboard(props){

  var moment = require('moment');



    const [isDropdown, setisDropdown] = useState(true);
    const [article, setArticle] = useState([{}]);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [role, userRole] = useState("");
    const [data, isData] = useState();
  
    // important! jab api call hoga logout ke liyea tab response ke hisab se loginBtn state ko update karna hai. tab jake page render hoga home page ke liyea.
    // const dispatch = useDispatch();
    // const {isLogin} = useSelector(state=>state.custom);
  
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
      },1000)

      


        }
      })


      // store.dispatch({
      //   type: "checkLogout",
      //   payload:false,
      // })
    }
  

    
    const handleClick = ()=>{
        setisDropdown(!isDropdown);
    }


    const fetctInfo = async ()=>{
    
      const token = document.cookie;

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/userJournal`, {token})
            .then(res=>{
              if(res.status===200){
                console.log(res);
                console.log("blog ka data hai to show hona chiyea");
                isData(true);

              
                const {name, email,role} = res.data.user;
                setUser(name);
                setEmail(email);
                userRole(role);
                setArticle(res.data.allUserData);

              }
              
              else if(res.data.allUserData===undefined){
                console.log(res);
                const {name, email,role} = res.data.user;
                setUser(name);
                setEmail(email);
                userRole(role);
                isData(false);
                console.log(res.data);
                console.log("blog ka data nahi hai to block dikhna nahi chiyea");
              }
          
          })
          .catch((e)=>{
            console.log(e);
          })

    }
            
    
  
    useEffect(()=>{
      fetctInfo();
      handleClick();
      
    },[])



    return(
     
        <div className="App">
        
        <div>
          <Nav/>
          
          <div className="overflow-auto overflow-x-hidden  absolute ">
          <div className='ml-52 mt-8 w-3/4 '>
           
            <h1 className='text-2xl font-medium'>{props.title}</h1>
            <p className='mt-2'>Welcome to ApnaBlog. here you can create and Manage your Dashboard</p>
            
          </div>
          </div>
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
            
            
            {isDropdown===true? <div id="dropdownAvatarName" class="z-52 shadow-xl   bg-white divide-y divide-gray-300 rounded-lg  w-44 ">
                <div class="px-4 py-3 text-sm text-gray-900 ">
                  <div class="font-medium ">{role}</div>
                  <div class="truncate">{email}</div>
                </div>
                <ul class="py-2 text-sm text-gray-700  " aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                  <li className=" bg-gray-200  hover:bg-gray-100 ">
                    <a href="#" class="block px-4 py-2  ">Posts</a>
                  </li>
                  <li className="mt-1">
                    {/* <a href="/Compose" class="block px-4 py-2 hover:bg-gray-100  ">Compose</a> */}
                    <Link to="/compose" > <a href="" class="block px-4 py-2 hover:bg-gray-200">Compose</a></Link>
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

   

          <div className=' md:ml-52 mt-20 mb-14 w-3/4 space-y-10 '>

            <h2 className="text-xl font-medium bg-gray-600 hover:bg-gray-700 rounded-sm text-white w-28 p-2 hover:cursor-pointer" >Your Posts</h2>
            

          {/* main content starts here */}

          {/* {console.log(data)} */}
            <div style={data===true?{display:""}:{display:"none"}}>
          {article.slice().reverse().map((data,i)=>
        



        //ye div hai

        <div key={i} className="mt-2 hover:cursor-pointer flex flex-row w-7/3 justify-between items-start p-2 border-solid border-2 border-gray-300 ">

        <div  className=""> 
        <div className="inline-flex space-x-1 sm:w-auto ">
       
          {data.display=='private'?< MdLockOutline size={25} />:<MdLockOpen size={25} />}
          <h1 className="h-8 sm:truncate truncate sm:line-clamp-2  font-semibold ">
            
            {data.title}
          </h1>
        </div>
        
        <p className="mt-2 sm:line-clamp-2 line-clamp-2">
          {data.description}
        </p>
        <p>{data.date}</p>
        </div>

          <div className="hover:cursor-default p-1 w-16 h-17 text-white text-center shrink-0 bg-purple-500">
          <p class="text-sm">{ moment(`${data.date}`).format('dddd MMMM DD YYYY').substring(0,3).toUpperCase() }</p>
          <p class="text-3xl leading-none font-bold">{moment(`${data.date}`).format('DD-MM-YYYY').substring(0,2)}</p>
          <p className="text-sm font-light" >{moment(`${data.date}`).format('DD-MM-YYYY').substring(6,10)}</p>
        </div>
        </div>
          )} 
          </div>  
        
        


      </div>
      

          
        <footer className='w-screen bg-teal-400 h-12 fixed bottom-0 left-0 flex justify-center items-center '>
          <p className='flex justify-center '>Baljit Singh</p>
        </footer>

        </div>
          

      </div>
 
    )

    
}