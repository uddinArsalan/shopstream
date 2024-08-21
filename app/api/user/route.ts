import connectDB from "@/app/lib/db/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { User } from "@/app/models/User";
import { findUserById } from "@/app/lib/db";

export async function GET() {
  try {
    const userId = cookies().get("userId")?.value;
    console.log(userId);
    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    await connectDB()
    const user = await findUserById(userId);
    console.log(user)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
