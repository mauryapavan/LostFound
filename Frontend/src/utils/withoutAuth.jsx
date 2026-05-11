import { Children, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const WithoutAuth=({children})=>{
    const isauthenticate=()=>{
        if(Cookies.get('token')){
            return false
        }
        else{
            return true
        }
    }
    let navigate=useNavigate()

    useEffect(()=>{
        if(!isauthenticate()) navigate("/")
    
    },[])

    return (children)
}

export default WithoutAuth