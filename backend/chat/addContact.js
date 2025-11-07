import Contact from "../Model/newcontact.js";


const addContact = async (req, res) => {
    const { sender, receiver } = req.body;
    if (!sender || !receiver) {
        res.json({ status: false, message: "something is wrong " });
    }

    try {
        let contacts = await Contact.find({ sender:sender,receiver:receiver })
        if (contacts.length > 0) {
            res.json({ status: true })
        }
        else {
            let contact = new Contact({ sender: sender, receiver: receiver })
            await contact.save();
            res.json({ status: true })
        }


    }
    catch (e) {
      
        res.json({ status: false, message: e });
    }


}
export default addContact;