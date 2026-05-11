import { storage,cloudinary } from "../newFound/cloudConfig.js";
import multer from "multer";
import authrization from "../newFound/authroization.js";
import express from 'express';
import addItem from "../newFound/additem.js";
import auth from "../auth/auth.js";
import Login from "../auth/login.js";
import Signup from "../auth/signup.js";
import location from "../search/location.js";
import search from "../search/search.js";
import items from "../Model/itemModel.js";
import users from "../Model/userModel.js";
import deleteitem from "../delete/deleteitem.js";
import dotenv from 'dotenv';
import homeItem from "../search/homeItem.js";
const router = express.Router();
const upload = multer({ storage });
dotenv.config();

router.post("/newfound", upload.single('file'),authrization,addItem );

router.post("/auth",auth);
router.post("/login",Login);
router.post("/signup",Signup);
router.post("/search",location,search);
router.post("/homeItem",homeItem);
router.post("/item",async(req,res)=>{
  let {id}=req.body;
  let data = await items.findOne({_id:id});
  let founder=await users.findOne({email:data.owner});
 
  res.json({data,founder});
})
router.post("/myitem",authrization,async(req,res)=>{
  let {email}=req.body;
  let data = await items.find({owner:email});
  res.json(data);
})
router.patch("/myitem",authrization,deleteitem);
router.post("/homItem",homeItem);
const apiroutes=router
export default  apiroutes;