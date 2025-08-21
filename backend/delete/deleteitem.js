import items from "../Model/itemModel.js";


const deleteitem=async(req,res)=>{

    let {email,id}=req.body;
  let data = await items.findOne({_id:id});
  if(email==data.owner){
    await items.findByIdAndDelete(id)
    .then(()=>{
      res.json({status:true,message:"item hes deleted succesfully"});
    })
  }
  else{
     res.json({status:false,message:"you are not author of this item"});
  }
}

export default deleteitem;