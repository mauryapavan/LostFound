import Contact from "../Model/newcontact.js"

let Timeupdate=async (sender,receiver) => {
    try{
        await Contact.updateOne({sender:sender,receiver:receiver},{$set:{time:Date.now()}});
         await Contact.updateOne({sender:receiver,receiver:sender},{$set:{time:Date.now()}})
    }catch(e){
        console.log(e);
    }
}

export default Timeupdate;