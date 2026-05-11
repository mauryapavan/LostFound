import Contact from "../Model/newcontact.js";
import users from "../Model/userModel.js";


const addContact = async (req, res) => {
    const { sender, receiver } = req.body;
    
    if (!sender || !receiver) {
        res.json({ status: false, message: "something is wrong " });
    }

    try {
        let existuser =await users.find({email:receiver});
        // check receiver is exist or not 
        if(!existuser){
            res.json({status:false,message:"this person not have account on lost found"});
        }
        
        let contacts = await Contact.find({ sender:sender,receiver:receiver })
        if (contacts.length > 0) {
            res.json({ status: true })
        }
        else {
            let contact = new Contact({ sender: sender, receiver: receiver })
            await contact.save();

            contact=new Contact({ sender:receiver, receiver:sender});
              await contact.save();
            res.json({ status: true })
        }


    }
    catch (e) {
      
        res.json({ status: false, message: e });
    }


}
export default addContact;