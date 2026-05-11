import React, { useContext, useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faComment } from "@fortawesome/free-solid-svg-icons";
import AddnewContact from "../helper/addnewContact";
import Chat from "./chat";
import io from 'socket.io-client'
import { MainContext } from "../Context/mainContext";

const socket = io('http://localhost:1919');

export default function Chatbar() {
    let {client2,userData,fetchUser}=useContext(MainContext)
    let navigate = useNavigate("");

    let [emails, setemails] = useState([{ sender: "", receiver: "" }]);
   
   
    let [addcontact, setaddcontact] = useState(false);
    let [ischat, setischat] = useState(false);
    let [curr, setcurr] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    // <------ chat with some one ----->
    const goTochat = (rec) => {
        if(rec!=""){
         setcurr(rec);
         setischat(true);
        }
        
        };

    // <----- find all chats-->    
    async function findConatect() {
        let data = await client2.post("/findContact", { user: userData.email });
     
        setemails(data.data.contacts)
    }
    const connectTOserver=()=>{
        socket.emit('user:online',userData.email );
           socket.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        });
        return () => socket.off("onlineUsers"); 
    }    

    useEffect(() => {
        if(userData.email != ""){
          findConatect();
          connectTOserver()
        }
       
    }, [userData])
      
    return (
        <div className="sm:m-5 sm:p-5 m-1 p-1">
            {ischat == true ? <Chat socket={socket} sender={userData.email} receiver={curr} setischat={setischat} /> :
                <div className="p-4 bg-white rounded-sm">
                    <h2 className="text-lg font-semibold mb-3">Chat list</h2>
                    {
                        addcontact == false ?
                            <ul className="space-y-2">
                                {emails.map((email, index) => (
                                    <li
                                        key={index}
                                        className="p-2 min-h-[3rem] mt-5 border rounded-md hover:bg-sky-500  transition duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                                    >
                                        <div className="flex items-center " onClick={() => { goTochat(email.receiver) }}>
                                            <img
                                                src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${email.receiver}`}
                                                alt={email}
                                                className="w-10 h-10 rounded-full border-4 border-indigo-400 shadow-md"
                                            />
                                            
                                            {onlineUsers.includes(email.receiver) ? (
                                                <p className="m-2 text-sm sm:text-base" style={{ color: "green" }}>  {email.receiver}   🟢 Online</p> 
                                            ) : (
                                               <p className="m-2 text-sm sm:text-base"  style={{ color: "gray" }}>  {email.receiver}  🔴 Offline</p> 
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            :
                            <div>
                                <AddnewContact setcurr={setcurr} setischat={setischat} setaddcontact={setaddcontact}/>
                            </div>

                    }

                    <div className="m-5 p-5 w-3/4 profile text-center" onClick={() => { setaddcontact(!addcontact) }}>
                        <FontAwesomeIcon icon={faAddressCard} className="text-5xl sm:text-7xl text-green-900" />
                        {
                            addcontact == false ?


                                <p >Add new member</p>
                                :
                                <p>Close that Adder</p>

                        }

                    </div>
                </div>
            }
        </div>
    );
}