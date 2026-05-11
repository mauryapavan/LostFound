import Contact from "../Model/newcontact.js";


const findContact = async (req, res) => {
    const { user } = req.body;
    if (!user) {
        res.json({ status: false, message: "please log in" });
    }
    else {
        try {
            let contacts = await Contact.find({ sender: user }).sort({ time: -1 })
            res.json({ status: true, contacts: contacts });

        }
        catch (e) {
            res.json({ status: false, message: e });
        }
    }



}
export default findContact;