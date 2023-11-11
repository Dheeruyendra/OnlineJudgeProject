import express from "express";
import DBConnection from "./database/db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    //get all data from body(req.body)
    const { email, password } = req.body;
    console.log(req.body);

    //validate data (check if user already exists)
    if (!email && !password){
      return res.status(400).json({ message: "All fields are required" });
    }
 
    //find user in db(if exists)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exists " });
    }

    //compare password (bcrypt)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //generate token (jsonwebtoken)
    const token = jwt.sign(
        { id: user._id, email}, 
        process.env.SECRET_KEY, 
        {expiresIn: "24h"}
        );
    user.token = token;
    user.password = undefined;

    //store cookies
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, //cookie cannot be accessed by client side script
    };
    store.set('email', {name : user.email});
    res.status(200).cookie("token", token, user.email, options)
    .json({ 
            message: "User logged in successfully ", 
            success: true, 
            token,
            email,
            withCredentials: true
        });

  } catch (error) {
    console.log(error.message);
  }
};

const signup = async (req, res) => {
  try {
    //get all data from body(req.body)
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body);

    //validate data (check if user already exists)
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists " });
    }

    //hash password (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 12);

    //save user to db
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    //generate token (jsonwebtoken)
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    user.token = token;
    user.password = undefined;

    res.status(200).json({
      message: "You have registered successfully",
      success: true,
      user,
    }); 
  } catch (error) {
    console.log(error.message);
  }
};

export { login, signup };
