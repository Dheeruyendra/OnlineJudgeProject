import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    //get all data from body(req.body)
    const { email, password } = req.body;
    console.log(req.body);

    //validate data (check if user already exists)
    if (!email || !password) {
      return res.status(422).json({ error: "All fields are required" });
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
    } else {
      let token = await user.generateAuthToken();
      res
        .status(201)
        .json({ token: token, message: "User logged in successfully" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const signup = async (req, res) => {
  //get all data from body(req.body)
  const { name, userid, email, password, cpassword } = req.body;
  console.log(req.body);

  //validate data (check if user already exists)
  if (!name || !userid || !email || !password || !cpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //check if user already exists
    const userEmailExists = await User.findOne({ email: email });
    const userIdExists = await User.findOne({ userid: userid });

    if (userEmailExists) {
      return res.status(409).json({ message: "User already exists " });
    } else if (userIdExists) {
      return res.status(406).json({ message: "UserId is not available" });
    } else if (password !== cpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    //register new user
    else {
      const user = new User({ name, userid, email, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { login, signup };
