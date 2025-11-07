


import react, { useState } from "react"
import { ToastContainer, toast } from "react-toastify";

import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({setuser}) => {
    let navigate=useNavigate();

    if(Cookies.get('token')){
        navigate("/");
    }
  
    let [input, setinput] = useState({ email: "", password: "" })
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



    async function signup(e) {
        e.preventDefault();
        try {
            let data = await axios.post("https://lostfound-3b7h.onrender.com/login",input)
            const { status, message, token,user } =  data.data;
           
            if (status) {
                if (token) {
                    Cookies.set("token", JSON.stringify(token), { expires: 1 }); // 7 days
                    Cookies.set("user", JSON.stringify(user.email), { expires: 1 }); // 7 days
                    setuser(user)
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
        setinput({
            ...input,
            email: "",
            password: "",

        })
    }


    return (
        <div className="flex-col justify-self-center  " style={{ color: "whitesmoke" }} >
            <div className=" flex-col justify-items-center align-items-center p-3 m-3 sm:p-5 sm:m-5 backdrop-blur-sm loginpage backdrop-brightness-130 ">
                <div className="sm:p-3 sm:m-5 p-2 m-2">
                    <h1 className="font-serif text-4xl">Log in</h1>
                </div>
                <form action="" onSubmit={signup}>

                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" value={input.email} type="email" onChange={handleOnChange} required className="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder=" your email" />

                    </div>


                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label htmlFor="password" className="sr-only">password</label>
                        <input id="password" name="password" type="password" value={input.password} onChange={handleOnChange} required className="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl" placeholder="enter your password" />

                    </div>

                    <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                        <button type="submit" className="w-45 sm:w-60 flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log in </button>
                    </div>
                </form>

                <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                    <p> if you have not any acount on Lost&Found <a onClick={()=>{navigate("/Signup")}} style={{ color: "blue" }}>Sign up <span aria-hidden="true">&rarr;</span></a></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
