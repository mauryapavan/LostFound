import items from "../Model/itemModel.js";

const homeItem=async(req,res)=>{
    try{
        let arr= await items.find().sort({ _id: -1 }).limit(10);
        res.json({status:true,data:arr})
    }
    catch(e){
        res.json({status:false,message:e})
    }
   
}

export default homeItem