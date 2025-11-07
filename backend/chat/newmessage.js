
import Message from "../Model/message.js";


const NewMessage= async (req, res) => {
  const { sender, receiver, message } = req.body;
  
  const msg = await Message.create({ sender, receiver, message });
  res.json(msg);
};

export default NewMessage;