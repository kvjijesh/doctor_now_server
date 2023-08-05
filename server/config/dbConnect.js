import mongoose from "mongoose";

export const connect=async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    throw error
  }
}
mongoose.connection.on("disconnected",()=>{console.log('mongodb connection failed');})
