import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


const SearchItem = () => {

    let [item, setitem] = useState({ name: "", description: "", image: "" });
    let [founder, setfounder] = useState({ name: "", email: "", number: '' })

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    async function find() {
        let data = await axios.post("http://localhost:1919/item", { id });
       
        setitem(data.data.data);
        setfounder(data.data.founder);
    }

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


            </div>
        </div>
    )
}

export default SearchItem;