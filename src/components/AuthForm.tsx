// src/components/AuthForm.tsx
 
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "firebase/auth"
  import React, { useState } from "react"
   
  import { auth } from "~firebase/firebaseClient"
  import useFirebaseUser from "~firebase/useFirebaseUser"
   
  export default function AuthForm() {
    const [showLogin, setShowLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const { isLoading, onLogin } = useFirebaseUser()
   
    const signIn = async (e: any) => {
      if (!email || !password)
        return console.log("Please enter email and password")
   
      e.preventDefault()
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error: any) {
        console.log(error.message)
      } finally {
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        onLogin()
      }
    }
   
    const signUp = async (e: any) => {
      try {
        if (!email || !password || !confirmPassword)
          return console.log("Please enter email and password")
   
        if (password !== confirmPassword)
          return console.log("Passwords do not match")
   
        e.preventDefault()
   
        const user = await createUserWithEmailAndPassword(auth, email, password)
        onLogin()
      } catch (error: any) {
        console.log(error.message)
      } finally {
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      }
    }
   
    return (
      <div className="flex items-center justify-center w-full p-4 overflow-x-hidden rounded-xl overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="w-full max-w-2xl max-h-full">
          <div className="p-10 bg-white rounded-lg shadow">
            <div className="flex flex-row items-center justify-center">
              {!isLoading && (
                <span className="text-black font-bold text-3xl text-center">
                  {showLogin ? "Login" : "Sign Up"}
                </span>
              )}
              {isLoading && (
                <span className="text-black font-bold text-3xl text-center">
                  Loading...
                </span>
              )}
            </div>
   
            <div className="p-4 rounded-xl bg-white text-black">
              {!showLogin && !isLoading && (
                <form className="space-y-4 md:space-y-6" onSubmit={signUp}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light text-gray-500">
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline"
                          href="#">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-black bg-gray-300 hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Already have an account?{" "}
                    <button
                      onClick={() => setShowLogin(true)}
                      className="bg-transparent font-medium text-primary-600 hover:underline">
                      Login here
                    </button>
                  </p>
                </form>
              )}
              {showLogin && !isLoading && (
                <form className="space-y-4 md:space-y-6" onSubmit={signIn}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded accent-primary bg-gray-50 focus:ring-3 focus:ring-primary"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500 ">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-black bg-gray-300 hover:bg-primary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <button
                      onClick={() => setShowLogin(false)}
                      className="bg-transparent font-medium text-primary-600 hover:underline">
                      Sign up
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }