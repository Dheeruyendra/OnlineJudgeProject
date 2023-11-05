import express from "express";
import DBConnection from "./database/db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const app = express();
const port = process.env.PORT || 8000;
DBConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
      try{
      //get all data from body(req.body)
      const {email, password, firstName, lastName} = req.body;
      console.log(req.body);

      //validate data (check if user already exists)
      if((!email || !password || !firstName || !lastName)) return res.status(400).json({message: "All fields are required"});
      //check if user already exists
      const existingUser = await User.findOne({email});
      if(existingUser) return res.status(200).json({message: "User already exists "});
   
      //hash password (bcrypt)
      const hashedPassword = await bcrypt.hash(password, 12);
      //save user to db 
      const user = await User.create({email, password: hashedPassword, firstName, lastName});
      
      //generate token (jsonwebtoken)
       const token = jwt.sign({id : user._id, email}, process.env.SECRET_KEY, {expiresIn: "1h"});
       user.token = token;
       user.password = undefined;
       res.status(201).json(
        {message: "User created successfully ", user}
       );
      } catch (error) {
        console.log(error.message);
      }
});  

app.post("/login", async (req, res) => {
     try{
      //get all data from body(req.body)
      const {email, password} = req.body;
      console.log(req.body);

      //validate data (check if user already exists)
      if((!email || !password)) return res.status(400).json({message: "All fields are required"});
      //check if user already exists
      const existingUser = await User.findOne({email});
      if(!existingUser) return res.status(200).json({message: "User does not exists "});
   
      //compare password (bcrypt)
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});
      
      //generate token (jsonwebtoken)
      const token = jwt.sign({id : existingUser._id}, process.env.SECRET_KEY, {expiresIn: "1h"});

      //store cookies
      const options = {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      };
      
      //send the token
      res.status(200).cookie("token", token, options).json({message: "User logged in successfully ", success: true, token});
     } catch (error) {
       console.log(error.message);
     }   
});  

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});