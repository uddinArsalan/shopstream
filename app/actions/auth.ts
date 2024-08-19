"use server";
import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from "@/app/lib/utils/definitions";
import { createUser, findUserByEmail, generateUserTokens } from "@/app/lib/db";
import { cookies } from "next/headers";
import connectDB from "@/app/lib/db/connectDB";

const ACCESS_TOKEN_EXPIRY = 60 * 60 * 24;
// const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 7;

function setTokenCookies(accessToken: string) {
  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ACCESS_TOKEN_EXPIRY,
    sameSite: "lax",
    path: "/",
  });

  // cookies().set("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  // maxAge: REFRESH_TOKEN_EXPIRY,
  //   sameSite: "lax",
  //   path: "/",
  // });
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
    console.log(user);
    // const { accessToken, refreshToken } = await generateUserTokens(user._id);
    // setTokenCookies(accessToken, refreshToken);
    const accessToken = await generateUserTokens(user._id);
    setTokenCookies(accessToken);

  } catch (error) {
    console.error("Signup error:", error);
    return { message: "An error occurred during signup" };
  }
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;
  await connectDB();
  const user = await findUserByEmail(email);

  if (!user || !(await user.isPasswordCorrect(password))) {
    return { message: "Invalid credentials" };
  }

  // const { accessToken, refreshToken } = await generateUserTokens(user._id);
  // setTokenCookies(accessToken, refreshToken);
  if (cookies().get("accessToken")?.value)
    return { message: "User Already Login" };
  const accessToken = await generateUserTokens(user._id);
  setTokenCookies(accessToken);

}

export async function logout() {
  cookies().delete("accessToken");
  cookies().delete("userId");
}
