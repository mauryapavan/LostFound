import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../Context/mainContext";




export default function Chat({socket,receiver,setischat}) {
  let {client2,userData,fetchUser}=useContext(MainContext)
  const [messages, setMessages] = useState([""]);
  const [text, setText] = useState("");
  let navigate = useNavigate();
 
  const newReciver = receiver.replace(/"/g, '');
  //load chat
  useEffect(() => {
   
     const fetchMessages = async () => {
      const res = await client2.get(`/messages`, {
        params: { sender: userData.email, receiver: newReciver },
      });

      setMessages(res.data);
    };
    fetchMessages();

  }, [ receiver]);


  // Socket listener
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
    });
     return () => socket.off("receiveMessage");
  }, []);


  // message sender
  const sendMessage = async () => {
         const newReciver = receiver.replace(/"/g, '');
         socket.emit("chat:send", { message: text, sender:userData.email, receiver: newReciver });
         setText("")
  };
 



  return (
    <div className="p-4 m-5 bg-fuchsia-800 rounded-md lg:w-1/2">
      <div onClick={()=>{setischat(false)}} className="p-2 m-2 text-3xl hover:bg-sky-500  transition duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer">
          <FontAwesomeIcon icon={faAnglesLeft} className="" />
      </div>
      <div className="p-2 m-2 bg-blue-600 text-white font-bold  rounded-sm text-md sm:text-lg">
        Chat with {receiver}
      </div>
      {/*text aree---------  */}
      <div className="border p-2 m-2 h-64 overflow-y-auto bg-blue-600  scroll-smooth rounded-md" >
        {messages.map((c, i) => (

          <div
            key={i}
            className={`flex ${c.sender === userData.email ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`p-1  sm:p-3 m-1 sm:m-2 rounded-xl max-w-xs text-sm ${c.sender === userData.email 
                ? "bg-white text-gray-800 rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none"
                }`}
            >
              {c.message}
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 m-5 flex gap-2 bg-white ">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type..."
          className="border p-1 flex-1 w-[2rem]"
        />
        <button className="sm:ml-2 ml-1 px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
          Send
        </button>

      </div>
    </div>
  );
}

