import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";




export default function Home() {
  
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
      center: [ 78.9629, 20.5937 ],
      zoom: zoom
    });
    map.current.setStyle(maptilersdk.MapStyle.HYBRID);

  }, []);


 
  return (
    <div className="map-wrap md:mx-4 sm:px-5 m-4  sm:py-3 lg:mx-5 flex flex-col " style={{ backgroundColor: "red" }}>

       <p>Search Above the nearest city whare did you loss your Item</p>


      <div ref={mapContainer}  className="map h-[35rem] sm:h-[42rem] lg:h-[45rem] w-full " style={{ backgroundColor: "white", borderRadius: "2%" }}></div>


    </div>
  );
}
