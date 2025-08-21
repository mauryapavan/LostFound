import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import maplibregl from "maplibre-gl";


import { useLocation, useNavigate } from 'react-router-dom';



const Search = () => {
    let location=useLocation();
    const data =location.state;
  
    let navigate=useNavigate();

   const mapContainer = useRef(null);
    const map = useRef(null);
    const tokyo = { lng: 139.753, lat: 35.6844 };
    const zoom = 10;
    maptilersdk.config.apiKey = import.meta.env.VITE_map_api_key;

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [data.center[0], data.center[1]],
            zoom: zoom
        });

        // Add navigation controls
        map.current.addControl(new maplibregl.NavigationControl(), "top-right");

        // Add markers
        data.allcoordinate.forEach((marker) => {
          
            const el = document.createElement("div");
            el.style.backgroundColor = "red";
            el.style.width = "20px";
            el.style.height = "20px";
            el.style.borderRadius = "50%";
            el.style.border = "2px solid white";
            el.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
            el.style.cursor = "pointer";

            const popup = new maplibregl.Popup({
                offset: 25,
                closeButton: false,
                closeOnClick: false,
            }).setText(marker.name);


            new maplibregl.Marker({ element: el })
                .setLngLat([marker.location[1], marker.location[0]])
                .setPopup(popup) // Tooltip on click
                .addTo(map.current);

            // ✅ Hover effects
            el.addEventListener("mouseenter", () => {
                 popup.addTo(map.current); // show popup on hover
                popup.setLngLat([marker.location[1], marker.location[0]]);
            });

            el.addEventListener("mouseleave", () => {
               popup.remove(); // hide popup when hover ends
            });


            // ✅ click event should be attached to "el" (your custom marker DOM element)
            el.addEventListener("click", () => {
                navigate(`/searcheditem?id=${marker._id}`); // pass id or route as needed
            });
        });



    }, []);



    return (
        <div>
            <div className="map-wrap p-2 m-2">
                <div ref={mapContainer} className="map h-[35rem] sm:h-[42rem] lg:h-[45rem] w-full " />
            </div>
        </div>
    )
}

export default Search;
