import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const authenticate = async (req, res, next) => {
      try{
          const token = req.headers.authorization;
          if(!token){
                return res.status(401).json({message: "Unauthorized access"})
          }
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
            const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});
            if(!rootUser){
                  throw new Error("User not found");
            }
            req.userdata = rootUser;
            next();
      }catch(error){
            res.status(401).json({message: "Unauthorized access"})
      }
};
export default authenticate;    


