import mongoose from "mongoose";
import { Schema } from "mongoose";

const contact = new mongoose.Schema({
  sender: String,
  receiver: String,

   time: {
    type: Date,
    default: Date.now,

  },
});
const Contact= mongoose.model("Contact", contact);


 
  export default Contact ;