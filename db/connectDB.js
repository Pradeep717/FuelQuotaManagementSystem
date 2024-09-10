import mongoose from "mongoose";
import { Server } from "socket.io";

const connectDB = async (server) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB connected: ${conn.connection.host}`);
    const db = conn.connection.db;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
