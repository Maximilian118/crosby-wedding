import mongoose from "mongoose";

/* Connects to MongoDB Atlas using the connection string from environment variables */
const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected successfully");
};

export default connectDB;
