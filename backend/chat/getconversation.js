import Message from "../Model/message.js";


const Getconversation= async (req, res) => {
  const { sender, receiver } = req.query;
  const messages = await Message.find({
    $or: [
    { sender: sender, receiver: receiver},
    { sender: receiver, receiver: sender },
  ],
  }).sort({ time: 1 });

  res.json(messages);
};

export default Getconversation;