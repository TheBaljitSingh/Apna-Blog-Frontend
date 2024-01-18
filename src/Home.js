import Dashboard from "./Dashboard";
import Login from "./Login";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import {background} from "../"

export default function Home() {

  // const {isAuthenticated} = useSelector(state=>state.custom);


  // console.log(isAuthenticated);

  
  // const token = document.cookie; // you should check token is valid or not
  // if(token){
  //   navigate('/Dashboard')
  // }else{
  //   navigate('/Login');
  // }

  

    return(
      

      // isAuthenticated ?<Dashboard/>:<Login/>
      <div   >
        <Nav/>
        <div className="flex flex-row justify-between">

          <div className=" ml-52 mt-28 ">
            <div className="ml-24 mt-24">
              <div>
                <h1 className="text-4xl font-serif font-extrabold">Start Blogging <br></br>Journey Now!</h1>
              </div>
            </div>
            <div className="ml-44 mt-2">
            <Link to="/Dashboard" onClick={()=>{console.log("clicked")}} > <button   type="button" class=" text-white bg-gray-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 outline-none"  >Login</button>   </Link>

            </div>

          </div>


          <div className="mr-[400px] mt-28">
            <div className="ml-6 ">
            <img  className=" opacity-90 rounded-xl  "  width={400} height={400} src="https://thesavvycouple.com/wp-content/uploads/2018/09/Best-Stock-Photo-Sites.jpg" alt="" />
            </div>
          </div>

        </div>

      </div>
      
    )


  


   

  }

