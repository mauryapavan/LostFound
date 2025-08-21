
import bcrypt from "bcrypt"
import users from "../Model/userModel.js";


  

const Signup=async(req,res)=> {

    

     
     let data=req.body;
    

    try {
    const { email, password, name,number } = data;
  
    let newpassword= await bcrypt.hash(password, 12)

    const existingUser = await users.findOne({ email });
    
    if (existingUser) {
      return res.json({ message: "User already exists",status:false });
    }
    let user = new users({email:email,number:number,name:name,password:newpassword});
    await user.save()

    
    return res.json({ message: "User signed in successfully", status: true })
  } catch (error) {
     return res.json({ message: error,status:false });
   
  }
}  

export default Signup;