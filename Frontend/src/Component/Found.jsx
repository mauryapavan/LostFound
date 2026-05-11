
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MainContext } from "../Context/mainContext";

const Found = () => {
    let token=Cookies.get('token')
    let {client}=useContext(MainContext)
    let navigate = useNavigate();
    let [data, setData] = useState([{ name: "", description: "", image: "" }])

  

    const handleError = (err) =>
            toast.error(err, {
                position: "bottom-left",
            });
        const handleSuccess = (msg) =>
            toast.success(msg, {
                position: "bottom-right",
            })

    async function adddata() {
           let item = await client.post("/myitem", { token });
    
           setData(item.data);
  }

    async function deletitem(id){
          let item = await client.patch("/myitem", { token ,id});
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
        <div className="min-h-80 p-5 m-5 flex flex-wrap content-start" style={{ color: "whitesmoke" }}>
            {
                data.length==0 ? <div className=" border-4 rounded-lg w-full text-center min-h-80 p-5 m-5" style={{ color: "white" }}>You are not Post Any Item </div>
             :
            data.map((el, ind) => {
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
