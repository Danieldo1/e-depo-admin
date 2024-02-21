import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  // await isAdmin();
  if(mongoose.connection.readyState === 1){
    return mongoose.connection.asPromise()
  } else {
    return mongoose.connect(uri)
  }
}