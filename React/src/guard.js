import { success , error } from "components/Loader/alertmessage";
import React,{memo, useEffect} from "react";
import { useNavigate } from "react-router";
function Guard({children}){
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem('auth')) || '';
    useEffect(()=>{
        if(auth == ''){
            error("Please Login Again")
            navigate('/login');
        }
        if(auth.isAuthenticated === false){
            error("Session Expired");
            navigate('/login');
        }
    },[])

    return<>{children}</>
}
export default memo(Guard);