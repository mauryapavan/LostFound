import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faComment } from "@fortawesome/free-solid-svg-icons";
import AddnewContact from "../helper/addnewContact";

export default function Chatbar() {
    let navigate = useNavigate("");
   
    let [emails,setemails]=useState([{sender:"",receiver:""}]);
    let {  user }=Cookies.get();
    let [addcontact,setaddcontact]=useState(false);
     const goTochat = (rec) => {
    navigate(`/chat?sender=${user}&receiver=${rec}`);
  };
   async function findConatect() {
        const newsender = user.replace(/"/g, '');
        let data = await axios.post("https://lostfound-3b7h.onrender.com/findConatect", { user:newsender});
      
        setemails(data.data.contacts)
    }
 
    useEffect(()=>{
           
            
          if(!user){
          navigate("/")
          }
          else{
            findConatect();
          }
        
    },[])
    


    return (
        <div className="sm:m-5 sm:p-5 m-1 p-1">
            <div className="p-4 bg-white rounded-sm">
                <h2 className="text-lg font-semibold mb-3">Chat list</h2>
                {
                    addcontact==false ?
                     <ul className="space-y-2">
                    {emails.map((email, index) => (
                        <li
                            key={index}
                            className="p-2 min-h-[3rem] mt-5 border rounded-md hover:bg-sky-500  transition duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="flex items-center " onClick={()=>{goTochat(email.receiver)}}>
                                <img
                                    src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${email.receiver}`}
                                    alt={email}
                                    className="w-10 h-10 rounded-full border-4 border-indigo-400 shadow-md"
                                />
                                <p className="m-2 text-sm sm:text-base" style={{ color: "forestgreen" }}>  {email.receiver}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                :
                  <div>
                    <AddnewContact />
                  </div>

                }
               
                <div className="m-5 p-5 w-3/4 profile text-center" onClick={()=>{setaddcontact(!addcontact)}}>
                       <FontAwesomeIcon icon={faAddressCard} className="text-5xl sm:text-7xl text-green-900" />
                   {
                    addcontact==false ?
                  
            
                    <p >Add new member</p>
                    :
                    <p>Close that Adder</p>

                   }
                    
                </div>
            </div>
        </div>
    );
}