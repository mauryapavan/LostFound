import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



export default function Chat() {

  const { search } = useLocation(); // gives "?id=123&name=pavan"
  const query = new URLSearchParams(search);

  const sender = query.get("sender");
  const receiver = query.get("receiver");
  



    const [messages, setMessages] = useState([""]);
    const [text, setText] = useState("");
    let navigate=useNavigate();
     // Fetch messages every 2 seconds (polling)
  useEffect(() => {
     const newsender = sender.replace(/"/g, '');
    const newReciver =receiver.replace(/"/g, '');
    const fetchMessages = async () => {
      const res = await axios.get(`https://lostfound-3b7h.onrender.com/messages`, {
        params: {  sender:newsender, receiver:newReciver },
      });
     
      setMessages(res.data);
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [sender, receiver]);

  const sendMessage = async () => {
    const newsender = sender.replace(/"/g, '');
    const newReciver =receiver.replace(/"/g, '');
    if (!text.trim()) return;
    await axios.post("https://lostfound-3b7h.onrender.com/message", { sender:newsender, receiver:newReciver, message: text });
    setText("");
  };
   


  return (
    <div className="p-4 m-5 bg-fuchsia-800 rounded-md lg:w-1/2">
      <div className="p-2 m-2 bg-blue-600 text-white font-bold  rounded-sm text-md sm:text-lg">
        Chat with {receiver}
      </div>
      {/*text aree---------  */}
      <div className="border p-2 m-2 h-64 overflow-y-auto  scroll-smooth rounded-md" style={{ backgroundColor: "blue" }}>
        {messages.map((c, i) => (

          <div
            key={i}
            className={`flex ${c.sender === sender.replace(/"/g, '') ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`p-1  sm:p-3 m-1 sm:m-2 rounded-xl max-w-xs text-sm ${c.sender === sender.replace(/"/g, '')
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

