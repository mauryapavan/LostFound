import mongoose from "mongoose";
import { Schema } from "mongoose";

const item=new Schema({
    name: String,
    description: String,
    image:String,
    location: [Number,Number],
    owner: String,
});



 const items=mongoose.model("item",item);
  export default items ;