'use client'
import { signup } from '@/app/actions/auth';
import { useFormStatus, useFormState } from 'react-dom';
import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
 
export default function SignupForm() {
  const [state, action] = useFormState(signup, undefined)
  const { pending } = useFormStatus();

  const router = useRouter();

  useEffect(() => {
    if (!pending && state && !state.errors && !state.message) {
      router.push("/");
    }
  }, [pending, state, router])

  return (
    <main className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-24'>
    <div className="w-full max-w-md ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Sign Up</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={action}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Full Name"
            name="name"
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-xs italic mt-1">{state.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
            <p className="text-red-500 text-xs italic mt-1">{state.errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            name="password"
          />
          {state?.errors?.password && (
            <div className="text-red-500 text-xs italic mt-1">
              <p className="text-gray-900 ">Password must:</p>
              <ul className="list-disc list-inside">
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
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
            {pending ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
      <div className="text-sm text-blue-500 text-center">Already have an account?  <Link href="/auth/login" className="text-blue-600 underline italic ">Sign in</Link></div>
    </div>
    </main>
  )
}