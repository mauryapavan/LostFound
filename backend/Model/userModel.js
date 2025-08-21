
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userschema=new Schema({
    name: String,
    email: { type: String, unique: true } ,
    password: String,
    number: Number,
});



 const users  =  mongoose.models.user || mongoose.model("user", userschema);;
  export default users ;