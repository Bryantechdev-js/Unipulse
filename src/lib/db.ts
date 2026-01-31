import mongoose from "mongoose";

export const connectToDatabase = async () => {
    const MONGODB_CONNECTION = process.env.MONGODB_URL;
    if(!MONGODB_CONNECTION)  throw new Error("MONGODB_URL not found in .env file")
  // Database connection logic here
  try{
       await mongoose.connect(process.env.MONGODB_URL!);
      console.log(" \n\n\n Connected to database 😎👌❄️");
  }catch(error){
      console.log(error);
  }
}
