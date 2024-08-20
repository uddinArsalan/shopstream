"use client"
import { login } from "@/app/actions/auth";
import { useFormStatus, useFormState } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginForm() {
  const [state, action] = useFormState(login, undefined);
  const { pending } = useFormStatus();
  // const router = useRouter()

  // useEffect(() => {
  //   if(!pending && state && !state.errors && !state.message){
  //     router.push("/");
  //   }
  // },[pending,router,state])

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-24">
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Sign In
      </h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={action}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-xs italic mt-1">
              {state.errors.email}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            name="password"
          />
          {/* text-red-500 text-xs italic mt-1 */}
          {state?.errors?.password && (
            <div>
              <p className="text-gray-900 text-xs">Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li className="text-red-500 text-xs italic mt-1" key={error}>
                    - {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {state?.message && <p className="text-red-500 text-xs">{state.message}</p>}
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
            type="submit"
            disabled={pending}
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
      <div className="text-sm text-blue-500 text-center mr-2">New Customer? <Link href="/auth/signup" className="text-blue-600 underline italic ">Sign up here</Link></div>
    </div>
    </main>
  );
}
