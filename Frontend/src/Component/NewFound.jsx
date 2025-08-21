

import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Newfound = () => {
    let navigate=useNavigate()
    const [location, setLocation] = useState(null);
    let [batch, setbatch] = useState({ name: "", description: "" });
    let [file, setfile] = useState(null);
    let [loading, setloading] = useState(false);
    function handle(e) {
        let { name, value } = e.target;

        setbatch({ ...batch, [name]: value });
    }
    let { token } = Cookies.get();

    //  toastcontainer
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        })



    // geo location

    const geolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => {
                    console.log(err.message);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

    }
    useEffect(() => {
        geolocation();
    }, [])

    async function shap(e) {
        setfile(e.target.files[0])
      }

    async function submit(e) {
        if(location==null){
                 handleError("please allow to loction on your browser")
                 return ;
        }

        // setloading(!loading);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('batch', batch.name);
        formData.append('batch', batch.description);
        formData.append('token', token);
        formData.append('location', location.latitude);
        formData.append('location', location.longitude);
       
        e.preventDefault();
        if (token) {
          setloading(!loading);
            try {


                const { data } = await axios.post(
                    "http://localhost:1919/newfound",formData );
                const { status, message } = data;
                
                if (status) {
                    handleSuccess(message);
                    setloading(!loading);
                } else {
                    handleError(message);
                    
                }
            } catch (error) {
                console.log(error);
            }
            setbatch({ name: "", description: "" })
        }
        else {
            handleError("you are not log in please log in");
            navigate("/Login");
        }
        
      setloading(false);  
    }
    return (
        <div className="flex-col justify-self-center mt-6   " style={{ color: "whitesmoke" }} >
          <p><span style={{color:"red"}}>Note &rarr; </span> Submit this form where you found item </p>

            {loading == true ? <div><h1 className="text-3xl">uploading ........</h1></div> :
                <div className=" flex-col justify-items-center  align-items-center p-3 m-3 sm:p-5 sm:m-5 backdrop-blur-sm loginpage backdrop-brightness-130 ">
                    <div className="sm:p-3 sm:m-5 p-2 m-2 flex">
                        <div className="sm:w-50 w-35">
                            <h1 className="font-serif text-xl">Add new found items</h1>
                        </div>

                        <div className="mx-9"><i className="fa-solid fa-xmark text-2xl" onClick={() => { setaddbatch(false) }}></i> </div>

                    </div>
                    <form action="" onSubmit={submit} encType="multipart/form-data">
                        <div className="sm:p-3 sm:m-3 p-1 m-1">
                            <label htmlFor="name" className="sr-only"> name</label>
                            <input id="name" onChange={handle} value={batch.name} name="name" type="text" required className="w-50 sm:w-90 bg-white/5 p-2 sm:p-3.5 text-xl" placeholder="write name of found items  " />

                        </div>
                        <div className="sm:p-3 sm:m-3 p-1 m-1">
                            <label htmlFor="description" className="sr-only">price</label>

                            <textarea placeholder="write about physical property of found items" name="description" id="description" value={batch.description} onChange={handle} type="text" required className="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl"></textarea>

                        </div>
                        <div className="sm:p-3 sm:m-3 p-1 m-1">
                            <label htmlFor="image_link" className="sr-only">upload image</label>
                            <input placeholder="" id="image_link" onChange={shap} type="file" required className="w-50 sm:w-90 bg-white/5  p-2 sm:p-3.5 text-xl" />
                            <p>upload image of items</p>
                        </div>

                        <div className="sm:p-5 sm:m-5 p-2 m-2 text-center">
                            <button><button type="submit" className="w-45 sm:w-60 flex-none sm:px-3.5 rounded-md bg-indigo-500 px-1.5 py-2.5 text-sm  text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">add Items</button></button>
                        </div>
                    </form>


                </div>}
           
        </div>
    )
}

export default Newfound