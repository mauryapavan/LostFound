
const location=async(req,res,next)=>{
    let {city}=req.body;
    const result = await fetch(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(city)}.json?key=KGSEJv9cudTCLabqDNT2`
        );
        const data = await result.json();
        req.body.location=data.features[0].center;
        next();
}

export default location