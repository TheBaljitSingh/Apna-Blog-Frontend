import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { redirect } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import store from "./store";
import Nav from "./Nav";




export default function Login(){

 
    



    const [loginPage, setLoginPage] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");





    const handleview = ()=>{
       setLoginPage(!loginPage);
    }



    useEffect(()=>{
      handleview();
    //   isLoginFun();
        

    },[])
    
  

    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const {isAuthenticated} = useSelector(state=>state.custom);
    // console.log(isAuthenticated);
  
    const loginBtn = ()=>{
        console.log("login wala btn call hua");

        // decode the cookie


    //   store.dispatch({
    //     type:"checkLogin",
    //     payload: true,
    //   })

      
    };
    
  
    

    
    
    const loginSubmit =  async (e)=>{
        e.preventDefault();


        setEmail("");
        setPassword("");


        await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/login`,{email, password})
        .then(res =>{   
            
            if(res.status===200){
                // yaha pe user aur token dono aaya hao post request login kiya tab
                console.log("login hua");

                // document.cookie = "key=value" => is format me store hota hai
                document.cookie = `token=${res.data.token}`;  ;
                console.log("cookie set ho gya");

                // navigate("/Dashboard");
                // navigate nahi karna hai refresh karna hai dashboard wala component render hone ke liyea



               toast.success("wow logged in successfully",{
                position: "bottom-center"
               });

                setTimeout(()=>{
                    window.location.reload();
                },2000)
             



            
                // loginBtn();
                //login kiya state change hua tab jake naviga te kar do dashboard wale route pe with dashboard component
                
                // navigate("/Dashboard");


            }else{
                console.error("Login failed", res.data);
                
                toast.error("Invalid Credentials",{
                    position: "bottom-center"
                });            }
        })
        .catch((error)=>{
            console.log(error.message);
            

        })
        


    }

    const signupSubmit = async (e)=>{
        e.preventDefault()

        if(cpassword!=password){
            toast.error("Password don't matched",{
                position: "bottom-center"
            }); 
        }
       
        else{
            setName("");
            setEmail("");
            setPassword("");
            setCpassword("");
            // console.log("signup successfully");

            
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/register`, {name,email, password,cpassword})
            .then(res=>{
                console.log(res);
                if(res.status==201){
                    console.log("Register hua");
                    handleview();
                    toast.success("successfully registered",{
                        position: "bottom-center"
                    });                    

                    

                }
            })
            .catch((error)=>{
                console.log(error);
                
            })
            

        }
        

        }

        
 
     return(
        <div>

        <Nav/>

          <div className="flex flex-row w-screen">
            <div className="w-1/2 flex  justify-center ">
                <div className=" mt-12 ">
                <h2 className="font-semibold text-xl ">Welcome to APNA BLOG! </h2>
                <p className="text-xl font-medium mt-4" >Start your Blogging Journy Now.</p>

                <div className="ml-4">
                <h4 className="mt-1">Follow thest easy <span className="underline self-baseline cursor-s-resize	" >steps</span>:</h4>
                <div className="mt-4 text-lg">
                <li className="mt-">Login/Signup with your account</li>
                <li className="mt-2">Go to Profile section </li>
                <li className="mt-2">Then Compose Section</li>
                <li className="mt-2">Write and click on Publish!</li>
                <li className="mt-2"> All Done 🎉</li>
                </div>
                
                </div>
                
            
                </div>
            </div>
            <div className=" w-1/2">
            {loginPage?
        <section class=" ">
    <div class=" flex flex-col items-center justify-between mx-auto my-12  px-6 py-8  md:h-screen lg:py-0">
      
      <div class=" w-full  bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Login to your account
              </h1>
              <form class="space-y-4 md:space-y-6" method="post" onSubmit={loginSubmit} >
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input required id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}   class="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input required id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  name="password" placeholder="••••••••" class="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 " />
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3  " required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 ">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 bg-slate-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Login</button>
                  <p class="text-sm font-light text-gray-500 ">
                      Don’t have an account yet? <a href="#" onClick={handleview} class="font-medium text-primary-600 hover:underline ">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
        </section>:
        <section  class=" ">
  <div class=" flex flex-col items-center justify-center -my-4 px-6 py-8 mx-auto md:h-screen lg:py-0">
  
      <div class=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div class=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Create and account
              </h1>
              <form class="space-y-4 md:space-y-6" method="post" onSubmit={signupSubmit}>
                 <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none " placeholder="your name" required=""/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none " placeholder="name@gmail.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password"  placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full outline-none p-2.5 " required=""/>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                      <input type="confirm-password" id="confirm-password" value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}  name="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 outline-none block w-full p-2.5 " required=""/>
                  </div>
                  <div class="flex items-start">
                      
                      
                  </div>
                  <button type="submit" class="w-full text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                  <p class="text-sm font-light text-gray-500 ">
                      Already have an account? <a onClick={handleview} href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
        </section>}
        </div>
        </div>

      

       

        <ToastContainer/>
        </div>
    )
}
