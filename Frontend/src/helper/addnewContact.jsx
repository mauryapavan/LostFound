import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Context/mainContext.jsx";



export default function AddnewContact({setcurr,setischat,setaddcontact}) {
    let navigate=useNavigate();
    let {userData,client2}=useContext(MainContext)
    let [text,settext]=useState("");
     
        //  toastcontainer
        const handleError = (err) =>
            toast.error(err, {
                position: "bottom-left",
            });
        const handleSuccess = (msg) =>
            toast.success(msg, {
                position: "bottom-right",
            })
    async function addmember(e) {
        e.preventDefault();
        try {
             
             let data = await client2.post("/newContact",{ sender:userData.email, receiver:text})
             let {status}=data.data;
             if(status){
                  setcurr(text)
                 setischat(true)
                 setaddcontact(false)
               }
             else{
                handleError(data.data.message)
              }
           } 
        catch (error) {
            handleError(error)
        }
    }

    return (
        <div className="m-5 p-5 bg-gray-900 text-center"> 
            <form action="" onSubmit={addmember}>

                    <div className="sm:p-5 sm:m-5 p-2 m-2 bg-white-800">
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" value={text} type="email" onChange={(e)=>settext(e.target.value)} required className="w-40 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder=" enter email" />

                    </div>

                    <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                        <button type="submit" className="w-30 sm:w-60 flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">add member </button>
                    </div>
                </form>
        </div>
    )
    
}