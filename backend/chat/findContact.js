import Contact from "../Model/newcontact.js";


const findContact = async (req, res) => {
    const { user } = req.body;
    if (!user) {
        res.json({ status: false, message: "please log in" });
    }
    try {

       let contacts = await Contact.find({ sender:user})
       

        res.json({ status: true, contacts: contacts });

    }
    catch (e) {
        res.json({ status: false, message: e });
    }


}
export default findContact;