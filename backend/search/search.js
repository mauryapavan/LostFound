import items from "../Model/itemModel.js";

// lat, lon in degrees. distanceKm in kilometers. bearingDeg: 0=N, 90=E, 180=S, 270=W
function destinationPoint(lat, lon, distanceKm, bearingDeg) {
  const R = 6371e3; // meters
  const φ1 = lat * Math.PI/180;
  const λ1 = lon * Math.PI/180;
  const θ  = bearingDeg * Math.PI/180;
  const δ  = (distanceKm * 1000) / R;

  const sinφ2 = Math.sin(φ1)*Math.cos(δ) + Math.cos(φ1)*Math.sin(δ)*Math.cos(θ);
  const φ2 = Math.asin(sinφ2);
  const λ2 = λ1 + Math.atan2(
    Math.sin(θ)*Math.sin(δ)*Math.cos(φ1),
    Math.cos(δ) - Math.sin(φ1)*Math.sin(φ2)
  );

  const lat2 = φ2 * 180/Math.PI;
  let lon2 = λ2 * 180/Math.PI;
  lon2 = ((lon2 + 540) % 360) - 180; // normalize to [-180,180]
  return { lat: lat2, lon: lon2 };
}


const search=async(req,res)=>{
   
   let {location}=req.body;

  let north=destinationPoint(location[1],location[0],15,0)
    let east=destinationPoint(location[1],location[0],15,90);
  let south=destinationPoint(location[1],location[0],15,180)
  let west=destinationPoint(location[1],location[0],15,270);

  let arr= await items.find();
 let allcoordinate=[];

 arr.forEach((el)=>{
   if(el.location[0]>=south.lat && el.location[0]<=north.lat){
      if(el.location[1]<=east.lon && el.location[1]>=west.lon){
         allcoordinate.push(el);
      }
   }
 })


   res.json({status:true,message:"request succesfully",allcoordinate,center:location})
}


export default search;


 