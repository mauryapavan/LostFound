import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { MainContext } from "../Context/mainContext";


const SearchItem = () => {

    let [item, setitem] = useState({ name: "", description: "", image: "" });
    let [founder, setfounder] = useState({ name: "", email: "", number: '' })

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    let { userData,fetchUser,client,client2 } = useContext(MainContext)
    let navigate = useNavigate();

    async function find() {
        let data = await client.post("/item", { id });

       
        setitem(data.data.data);
        setfounder(data.data.founder);
    }
    const goTochat = async (rec) => {
        let data = await client2.post("/newContact", { sender:userData.email, receiver: rec });
        let { status }=data;
        if (status) {
            navigate(`/chatbar`);
        }
       else{
         console.log(data);
        }


    };

    useEffect(() => {
       find();
    }, [])

    return (
        <div className="p-5 m-5" style={{ color: "whitesmoke" }}>
            <h1 className="text-3xl" style={{ color: "red" }}>{item.name}</h1>
            <h2 className="m-2">{item.description}</h2>
            {item.image && <img className="min-h-32" src={item.image} alt="" />}
            <div className="">
                <h1 className="text-3xl sm:text-4xl" style={{ color: "red" }}>Founder --:</h1>
                <h1 className="sm:text-xl" >Name:{founder.name}</h1>
                <h1 className="sm:text-xl" >Email:{founder.email}</h1>
                <h1 className="sm:text-xl" >Phone No.:{founder.number}</h1>
                <div className="m-5 p-5 w-[10rem] profile" onClick={() => { goTochat(founder.email) }}>
                    <FontAwesomeIcon icon={faPeopleArrowsLeftRight} className="text-5xl sm:text-7xl text-green-900" />
                    <p>Start Chat</p>
                </div>

            </div>
        </div>
    )
}

export default SearchItem;
