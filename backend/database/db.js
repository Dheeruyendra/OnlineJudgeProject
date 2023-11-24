import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBConnection = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  console.log(MONGO_URL);
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connection established");
  } catch (error) {
    console.log("Error while connecting with DB ", error.message);
  }
};

export default DBConnection;
