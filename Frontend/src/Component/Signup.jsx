import react, { useContext, useState } from "react"
import { MainContext } from "../Context/mainContext";


const Signup=()=>{
     let {Register}=useContext(MainContext)
   
     let [input, setinput] = useState({ name: "", email: "", password: "",number:"" })
    const handleOnChange = (e) => {
      let { name, value } = e.target;
      setinput({...input,[name]: value,});
    };

  async  function  signup(e) {
        e.preventDefault();
        Register(input)
        setinput({ name: "", email: "", password: "",number:"" })
        
    }

   
    return (
        <div className="flex-col justify-self-center  "  style={{color:"whitesmoke"}} >
            <div className=" flex-col justify-items-center align-items-center p-3 m-3 sm:p-5 sm:m-5 backdrop-blur-sm loginpage backdrop-brightness-130 ">
                <div className="sm:p-3 sm:m-5 p-2 m-2">
                    <h1 className="font-serif text-4xl">Sign in</h1>
                </div>
                <form action="" onSubmit={signup}>
                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="name" className="sr-only">Name</label>
                        <input id="name" name="name" value={input.name} onChange={handleOnChange} type="text" required class="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl" placeholder="your name" />

                    </div>
                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" value={input.email} type="email" onChange={handleOnChange} required class="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder=" your email" />

                    </div>
                     <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="email-address" className="sr-only">Email address</label>
                        <input id="number" name="number" value={input.number} type="number" onChange={handleOnChange} required class="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder=" your  mobile number" />

                    </div>

                    <div className="sm:p-5 sm:m-5 p-2 m-2">
                        <label for="password" className="sr-only">password</label>
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
