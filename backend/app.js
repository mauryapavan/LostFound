import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import Login from "./auth/login.js";
import Signup from "./auth/signup.js";
import auth from "./auth/auth.js";
import multer from "multer";
import { storage,cloudinary } from "./newFound/cloudConfig.js";
import authrization from "./newFound/authroization.js";
import addItem from "./newFound/additem.js";
import search from "./search/search.js";
import location from "./search/location.js";
import items from "./Model/itemModel.js";
import methodOverride from 'method-override';
import deleteitem from "./delete/deleteitem.js";
import users from "./Model/userModel.js";



dotenv.config();

const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(methodOverride('_method'));

const upload = multer({ storage });

dbconnect()
  .then(() => {
    console.log("succesfully connect database ")
  })
  .catch((err) => {
    console.log(err);
  })

async function dbconnect() {
 
  await mongoose.connect(process.env.mongo_url);
}

app.get("/",(req,res)=>{
    res.send("hii i am pawan maurya")
})



app.post("/newfound", upload.single('file'),authrization,addItem );

app.post("/auth",auth);
app.post("/login",Login);
app.post("/signup",Signup);
app.post("/search",location,search);

app.post("/item",async(req,res)=>{
  let {id}=req.body;
  let data = await items.findOne({_id:id});
  let founder=await users.findOne({email:data.owner});
 
  res.json({data,founder});
})
app.post("/myitem",authrization,async(req,res)=>{
  let {email}=req.body;
  let data = await items.find({owner:email});
  res.json(data);
})
app.patch("/myitem",authrization,deleteitem)


app.listen(process.env.port, () => {
  console.log("app is listen on 3333")
})