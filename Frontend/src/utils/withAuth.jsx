import { Children, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const WithAuth=({children})=>{
    const isauthenticate=()=>{
        if(Cookies.get('token')){
            return true
        }
        else{
            return false
        }
    }
    let navigate=useNavigate()

    useEffect(()=>{
        if(!isauthenticate()) navigate("/Login")
    
    },[])

    return (children)
}

export default WithAuth