import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useContext } from 'react';
import { MainContext } from "../Context/mainContext.jsx";
import { useNavigate } from 'react-router-dom';




export default function Home() {
  let [data,setData]=useState([]);
  let {client}=useContext(MainContext)
  let navigate=useNavigate()


  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const zoom = 3.5;
  maptilersdk.config.apiKey = import.meta.env.VITE_map_api_key;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [78.9629, 20.5937],
      zoom: zoom
    });
    map.current.setStyle(maptilersdk.MapStyle.HYBRID);

  }, []);


  const findItem=async()=>{
         let newdata=await client.post("/homeItem");
         setData(newdata.data.data)
         
  }

  useEffect(()=>{

     findItem()
  },[])



  return (
    <div className='p-7'> 
      <div className="map-wrap md:mx-4 sm:px-5 m-4  sm:py-3 lg:mx-5 flex flex-col lg:w-1/2" style={{ backgroundColor: "red" }}>

        <p>Search Above the nearest city whare did you loss your Item</p>


        <div ref={mapContainer} className="map h-[30rem] sm:h-[42rem] lg:h-[40rem] w-full " style={{ backgroundColor: "white", borderRadius: "2%" }}></div>


      </div>
      <div className='flex flex-wrap'>
           {
                    data.map((el,ind) => {
                        return (
                            <div key={ind} className="border-4 pt-5 px-5 py-5 pb-2 m-5 rounded-lg w-[15rem] flex flex-col Found">
                                <h1 className="text-2xl" style={{ color: "red" }}>{el.name}</h1>
                                <h3 style={{ color: "white" }}>{el.description}</h3>
                                <img src={el.image} alt="" className="w-[12rem] h-1/2" /><br /><br />
                                <button onClick={() => {navigate(`/searcheditem?id=${el._id}`)}} className="w-[8rem] rounded-lg bg-pink-500 py-1.5 px-4.5">Open</button>

                            </div>
                        )
                    })
                }
      </div>
    </div >
  );
}
