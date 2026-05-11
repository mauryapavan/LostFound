import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'

export const MainContext=createContext({})




export const MainContextProvider=({children})=>{
   const client=axios.create({baseURL:"http://localhost:1919/api"});
   const client2=axios.create({baseURL:"http://localhost:1919/chat"});
   let navigate=useNavigate()

    let [userData,setUserData]=useState({name:"",email:"",number:""});
     //  toastcontainer
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        })


// <---------------------LOGIN ------------------------------------------->
    const handleLogin=async(input)=>{
         try {
            let data = await client.post("/login",input)
            const { status, message, token,user } =  data.data;
           
            if (status) {
                if (token) {
                    Cookies.set("token", JSON.stringify(token), { expires: 4 }); // 7 days
                 
                    setUserData(user)
                }
            handleSuccess(message);
               setTimeout(() => {
                    navigate("/")
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        
    } 

// <---------------------Register ------------------------------------------->    

   const Register=async(input)=>{
     try {
            let data= await client.post("/signup",input)
           
            const { status, message } =  data.data;
        
            if (status) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/Login")
                    
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
    }

// <---------------------fetch userData ------------------------------------------->

   const fetchUser=async()=>{
      let { token } = Cookies.get();
      if(token){
        const { data } = await client.post("/auth", { token });
        const { status, user } = data;
        if (status) {
           setUserData(user);
        }
        else{
            handleError("some thing is worng")
        }

      }
        

    }
// <---------------------search item ------------------------------------------->  

const searchItem=async (city) => {
      let result=await client.post("/search",{city});
          navigate("/search", { state: result.data });
}



    let data={userData,setUserData,handleLogin,Register,fetchUser,searchItem,client,client2}
    return(
        <MainContext.Provider value={data} >{children}</MainContext.Provider>
    )
}
