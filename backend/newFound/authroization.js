import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

import dotenv from 'dotenv';
dotenv.config();












let authrization = async(req, res, next) => {
    let data = req.body;
   
    if (data.token) {
        
         let cleanedToken = data.token.replace(/^"|"$/g, '');
        try {
            var decoded = jwt.verify(cleanedToken, process.env.secret_token);
            
             let email = decoded.email;
             req.body.email=email;
             next();
        }
        catch (e) {
            console.log(e)
            res.send({ status: false, message: e })
        }
    }
    else {
        res.send({ status: false, message:"you are not log in or ragistred"});
    }

}

export default authrization;