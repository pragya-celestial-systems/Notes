import mongoose from "mongoose";
import { config } from "dotenv";
config();
export default async function connectToMongodb() {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.DB_CONNECTION_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}