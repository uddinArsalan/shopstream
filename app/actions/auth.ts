"use server";
import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from "@/app/lib/utils/definitions";
import { cookies } from "next/headers";
import connectDB from "@/app/lib/db/connectDB";
import { redirect ,permanentRedirect} from "next/navigation";
import { createUser,findUserByEmail,generateUserTokens } from "../lib/db";

const ACCESS_TOKEN_EXPIRY = 60 * 60 * 24;

function setTokenCookies(accessToken: string) {
  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ACCESS_TOKEN_EXPIRY,
    sameSite: "lax",
    path: "/",
  });
}

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const { name, email, password } = validatedFields.data;
    await connectDB();
    const existingUser = await findUserByEmail(email);
    console.log(existingUser);
    if (existingUser) {
      return { message: "User already exists" };
    }
    const user = await createUser(name, email, password);
    const accessToken = await generateUserTokens(user._id);
    setTokenCookies(accessToken);
  } catch (error) {
    console.error("Signup error:", error);
    return { message: "An error occurred during signup" };
  }
  permanentRedirect("/");
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const { email, password } = validatedFields.data;
    await connectDB();
    const user = await findUserByEmail(email);

    if (!user || !(await user.isPasswordCorrect(password))) {
      return { message: "Invalid credentials" };
    }
    if (cookies().get("accessToken")?.value)
      return { message: "User Already Login" };
    const accessToken = await generateUserTokens(user._id);
    setTokenCookies(accessToken);
    // return { user }
  } catch (error) {
    console.error("Login error:", error);
    return { message: "An error occurred during login" };
  }
  permanentRedirect("/");
}

export async function logout() {
  cookies().delete("accessToken");
  cookies().delete("userId");
  redirect("/auth/login");
}
