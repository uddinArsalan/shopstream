import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { Types } from "mongoose";
import { jwtVerify } from "jose";

const DB_NAME = "shopstream";
const { MONGODB_URI } = process.env;

type connectionObject = {
  isConnected?: number;
};

const connectionObj: connectionObject = {};

export async function connectDB(): Promise<void> {
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

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  return User.create({ name, email, password });
}

export async function findUserByEmail(email: string) {
  return User.findOne({ email });
}

export async function findUserById(userId: string) {
  return User.findById(userId, "name email");
}

export async function generateUserTokens(userId: Types.ObjectId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const accessToken = await user.generateAccessToken();
  // const refreshToken = await user.generateRefreshToken();
  // user.refreshToken = refreshToken;
  // await user.save({ validateBeforeSave: false });

  // return { accessToken, refreshToken };
  return accessToken;
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );
    return payload;
  } catch (error) {
    return null;
  }
}
