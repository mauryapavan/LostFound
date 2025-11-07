
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Found = () => {
    let navigate = useNavigate();
    let [data, setData] = useState([{ name: "", description: "", image: "" }])

    let token = Cookies.get('token');

    const handleError = (err) =>
            toast.error(err, {
                position: "bottom-left",
            });
        const handleSuccess = (msg) =>
            toast.success(msg, {
                position: "bottom-right",
            })

    async function adddata() {
        if (token) {
            let item = await axios.post("https://lostfound-3b7h.onrender.com/myitem", { token });
           setData(item.data);
        }
        else {
            navigate("/Login");
        }
    }

    async function deletitem(id){
     
        let item = await axios.patch("https://lostfound-3b7h.onrender.com/myitem", { token ,id});

        let {status,message}=item.data;
        if(status){
            handleSuccess(message);
            adddata();
        }
        else{
            handleError(message)
        }

    }

    useEffect(() => {
        adddata();
    },[])

    return (
        <div className="p-5 m-5 flex flex-wrap content-start" style={{ color: "whitesmoke" }}>
            {data.map((el, ind) => {
                return (
                    <div key={ind} className="border-4 p-5 m-5 rounded-lg w-[15rem] flex flex-col Found">
                        <h1 className="text-2xl" style={{ color: "red" }}>{el.name}</h1>
                        <h3>{el.description}</h3>
                        <img src={el.image} alt="" className="w-[12rem] h-1/2" /><br /><br />
                        <button onClick={()=>{deletitem(el._id)}} className="w-[8rem] rounded-lg bg-pink-500 py-1.5 px-4.5">Delete</button>

                    </div>
                )
            })}
        </div>
    )
}

export default Found