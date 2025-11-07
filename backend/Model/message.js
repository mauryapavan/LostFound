import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
   time: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7, // ⏳ auto-delete after 7 days (1 week)
  },
});
const Message = mongoose.model("Message", messageSchema);


 
  export default Message ;