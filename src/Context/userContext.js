import axios from "axios";
import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext({});

export function UsercontextProvider({children}){
    const [user, SetUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(()=>{
        const fetchUserProfile = async ()=>{
            try {
                //fetch kis liyea karwana hai????
                const response = await axios.get()
            } catch (error) {
                console.log(error);
                
            }

        }
    })
}