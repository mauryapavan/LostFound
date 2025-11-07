
import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookAtlas, faCircleUser, faCommentDollar, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const Profile = () => {
    let [user, setuser] = useState({name:"",email:"",number:"",_id:""});
    let navigate = useNavigate();
    function Found() {
        navigate("/Found");
    }
    function Newfound() {
        navigate("/NewFound");
    }
    function gotochat() {
         navigate(`/chatbar`);
    }

    function logout() {
        Cookies.remove('token');
        window.location.href = "/"; // causes full page reload
    }

    useEffect(() => {
        const verifyCookie = async () => {
            //!cookies.token
            let { token } = Cookies.get();
            
            
            if (token) {
                const { data } = await axios.post("https://lostfound-3b7h.onrender.com/auth", { token });
                const { status, user } = data;
                if (status) {
                   setuser(user);
                }
            }
            else{
                navigate("/Login")
            }




        };
        verifyCookie();
    }, [])

    return (
        <div className="flex flex-col justify-items-center align-items-center p-5 m-5 text-center" style={{ color: "whitesmoke" }}>
            <div className="flex flex-col sm:p-5 sm:m-5 p-1 mb-5 mr-1 ml-1 ">
                <div className=" sm:p-5 sm:m-3 p-3 m-2">
                    <FontAwesomeIcon icon={faCircleUser} className="text-7xl sm:text-9xl" />


                </div>
                <div>
                    <h2>{user.name}  | {user.email}  | {user.number}
                    </h2>

                </div>
            </div>
            <div className="flex  text-center justify-center  sm:flex-nowrap flex-wrap">
                <div className="m-5 p-5 w-1/2 profile" onClick={gotochat}>
                    <FontAwesomeIcon icon={faCommentDollar} className="text-5xl sm:text-7xl text-green-900" />

                    <p >Messages</p>
                </div>

                <div className="m-5 p-5 w-1/2 profile" onClick={Found} >
                    <FontAwesomeIcon icon={faBookAtlas} className="text-5xl sm:text-7xl" />

                    <p>found items</p>
                </div>
                <div className="m-5 p-5 w-1/2 profile" onClick={Newfound}>
                    <FontAwesomeIcon icon={faMoneyBill} className="text-5xl sm:text-7xl" />

                    <p  className="text-sm">found new items then create new form</p>
                </div>
                 
            </div>
            <button type="button" onClick={logout} className="w-60 cursor-pointer flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log out</button>
        </div>
    )
}


export default Profile
