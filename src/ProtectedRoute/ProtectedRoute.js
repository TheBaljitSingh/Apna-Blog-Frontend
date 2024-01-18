import React, { Children } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../Login'


export const ProtectedRoute = ({isAuthenticated, children}) =>{

    if(!isAuthenticated){
        console.log("login kar bhai")
        return <Navigate to={"/login"}/>;

    }

  return children?children:<Outlet/>;

    
  
}

export const ProtectedLogin = ({isAuthenticated})=>{
    if(isAuthenticated){
        return <Navigate to={"/Dashboard"} />
        

    }   
    return  <Login/>
}

// export default ProtectedRoute