const DB_NAME = "shopstream";
const { MONGODB_URI } = process.env;
import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connectionObj: connectionObject = {};

export default async function connectDB(): Promise<void> {
  if (connectionObj.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const { connection, connections } = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );
    connectionObj.isConnected = connections[0].readyState;
    console.log(`MongoDB connected \n DB HOST : ${connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error", error);
    process.exit(1);
  }
}