
 import axios from "axios";
import react, { useState } from "react"
import { useNavigate } from "react-router-dom";
 import { ToastContainer, toast } from "react-toastify";
 import Cookies from 'js-cookie';


const Signup=()=>{
   let navigate=useNavigate()
   if(Cookies.get('token')){
           navigate("/");
       }
     let [input, setinput] = useState({ name: "", email: "", password: "",number:"" })
    const handleOnChange = (e) => {
      
        let { name, value } = e.target;
        

        setinput({
            ...input,
            [name]: value,
        });
    };


//  toastcontainer
    const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    })



  async  function  signup(e) {
        e.preventDefault();
        try {
            let data= await axios.post("https://lostfound-3b7h.onrender.com/signup",input)
           
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
        setinput({
            ...input,
            email: "",
            password: "",
            name: "",
            number:0
        })
    }

   
    return (
        <div className="flex-col justify-self-center  "  style={{color:"whitesmoke"}} >
            <div className=" flex-col justify-items-center align-items-center p-3 m-3 sm:p-5 sm:m-5 backdrop-blur-sm loginpage backdrop-brightness-130 ">
                <div className="sm:p-3 sm:m-5 p-2 m-2">
                    <h1 className="font-serif text-4xl">Sign in</h1>
                </div>
                <form action="" onSubmit={signup}>
                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="name" class="sr-only">Name</label>
                        <input id="name" name="name" value={input.name} onChange={handleOnChange} type="text" required class="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl" placeholder="your name" />

                    </div>
                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" value={input.email} type="email" onChange={handleOnChange} required class="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder=" your email" />

                    </div>
                     <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="number" name="number" value={input.number} type="number" onChange={handleOnChange} required class="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder=" your  mobile number" />

                    </div>

                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="password" class="sr-only">password</label>
                        <input id="password" name="password" type="password" value={input.password} onChange={handleOnChange} required class="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl" placeholder="Set your password" />

                    </div>

                    <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                        <button type="submit" class="w-45 sm:w-60 flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign up</button>
                    </div>
                </form>

                <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                    <p> if you have already a acount on Lost&Found <a  onClick={()=>{navigate("/Login")}} style={{ color: "blue" }}>Log in <span aria-hidden="true">&rarr;</span></a></p>
                </div>
            </div>
         
        </div>
    )
}

export default Signup