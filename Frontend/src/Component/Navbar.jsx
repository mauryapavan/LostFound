


import { faMagnifyingGlassLocation, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import react, { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";




const Navbar = ({ user }) => {
    let navigate = useNavigate();
    const [city, setCity] = useState("");
  

    function navprof() {
        navigate("/Profile")
    }

    async function search() {
      

        let result=await axios.post("https://lostfound-3b7h.onrender.com/search",{city});
      
        navigate("/search", { state: result.data });
        setCity("");
    }


    return (
        <div>


            <nav className="flex items-center justify-between p-1 sm:p-3 sm:p-6 lg:px-8" aria-label="Global" style={{ color: "aliceblue" }}>
                <div className="flex lg:flex-1 text-center">
                    <a href="/" className="sm:m-1.5 sm:p-1.5 text-3xl sm:text-5xl icon ">

                        <FontAwesomeIcon icon={faMagnifyingGlassLocation} className="" />


                        <div className=""><span className="text-[15px] sm:text-lg font-sans profileicon sm:tracking-wide  sm:font-bold"  >Lost&Found</span></div>
                    </a>
                </div>
                <div className="mt-6 flex max-w-md gap-x-2 sm:gap-x-4">
                    <label htmlFor="search" className="sr-only">Batch name</label>
                    <input id="search" onChange={(e) => { setCity(e.target.value) }} value={city} name="search" type="text" required className="w-20 sm:w-60 bg-white/5 px-3.5" placeholder="search City" />
                    <button type="submit" onClick={search} className="flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Search</button>
                </div>

                {user ?
                    <div className="md-flex lg:flex lg:flex-1 lg:justify-end mr-1 sm:mr-5 "><a onClick={navprof} className="profileicon"><FontAwesomeIcon icon={faUser} className="text-2xl sm:text-4xl" /></a></div>
                    :
                    <div className="md-flex lg:flex lg:flex-1 lg:justify-end mr-1 sm:mr-5">
                        <div className="mr-1  sm:mr-5 signin">
                            <a onClick={() => { navigate("/Signup") }} className="  text-[15px] sm:text-lg  profileicon ">Sign in <span aria-hidden="true">&rarr;</span></a>
                        </div>
                        <div className="mr-1 sm:mr-5 login">
                            <a onClick={() => { navigate("/Login") }} className="sm:text-lg profileicon text-[15px]  ">Log in <span aria-hidden="true">&rarr;</span></a>
                        </div>

                    </div>}

            </nav>
        </div>
    )
}

export default Navbar;
