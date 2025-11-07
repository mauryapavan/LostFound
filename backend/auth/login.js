import dotenv from "dotenv";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import users from "../Model/userModel.js";

dotenv.config();

const Login= async (req,res)=> {
     try {
      const { email, password } =  req.body;
      
      if (!email || !password) {
        return res.json({status:false,message:"All fields are required"})
      }
      const user = await users.findOne({ email });
      if (!user) {
        return res.json({ message: 'Incorrect  email',status: false })
      }
      const auth = await bcrypt.compare(password.trim(), user.password.trim())
      
      if (!auth) {
        return res.json({ message: 'Incorrect password or email',status:false })
      }
      const token = jwt.sign({ email: user.email }, process.env.secret_token, { expiresIn: '168h' });
  
      
      return res.json({ message: "User logged in successfully", status: true,token:token,user });
     
    } catch (error) {
      console.error(error);
    }

}

export default Login;