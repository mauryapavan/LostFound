import dotenv from "dotenv";
import users from "../Model/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const auth = async (req, res) => {


    let data = req.body;

   
    const { token } = data;

   
    if (!token) {
        return res.json({ status: false, message: "please log in" })
    }
    else {
         let cleanedToken = token.replace(/^"|"$/g, '');
        var decoded = jwt.verify(cleanedToken, process.env.secret_token);
        

        let email = decoded.email;
        const user = await users.findOne({ email });
        if (user) { return res.json({ status: true, user: user }) }
        else { return res.json({ status: false, message: "something is wrong" }) }
    }

}

export default auth;