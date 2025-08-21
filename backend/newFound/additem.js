import items from "../Model/itemModel.js";


const addItem=async(req,res)=>{
    let data = req.body;
  
    try { 
   
   
     let item = new items({name:data.batch[0],description:data.batch[1],image:req.file.path,location:data.location,owner:data.email})
  
    await item.save()
      .then((result) => {
        
        res.json({ status: true, message: "new item add succesfully" });
      })
  }
  catch {
    (e) => {

      console.log(e);
      res.send({ status: false, message: e });
    }
  }
}

export default addItem;