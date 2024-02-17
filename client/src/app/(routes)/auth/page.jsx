"use client";

import Image from "next/image";
import React, { useState } from "react";
import { verifyOTP } from "@/api/index";
import { auth } from "@/firebase.config";
import { generateOTP } from "@/api/index";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const OTPInput = dynamic(() => import("otp-input-react"), { ssr: false });
const ResendOTP = dynamic(() => import("otp-input-react"), { ssr: false });
import { z } from "zod";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Authentication() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [clickSignUp, setClickSignUp] = useState(false);
  const validationSchema = z.object({
    name: z.string().min(1, "Name must be entered"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const handleChange = (event) => {
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setClickSignUp(true);
    try {
      validationSchema.parse(input);
      if (signUp) {
        createUser();
      } else {
        await signInWithEmailAndPassword(auth, input.email, input.password);
        
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.issues.map((issue) => issue.message);
        errorMessages.forEach((error) => toast.error(error));
      }
    }
  };

  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      console.log(userCredential.user);
      await updateProfile(auth.currentUser, {
        displayName: input.name,
      });
      console.log("Update Success");
      router.push("/dashboard");
      setClickSignUp(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid OTP");
      console.error(error);
    }
  };

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Authentication Failed!");
      });
  };

  return (
    <div className="h-svh grid place-items-center bg-gray-100">
      <div
        className="flex flex-1 flex-col justify-center  p-10 lg:px-8  bg-white  rounded h-screen w-screen lg:h-4/5 lg:w-1/3 lg:shadow-xl"
        style={{ minWidth: "400px" }}
      >
        <Toaster />
        <div className="md:mx-auto md:w-full md:max-w-sm">
          <Image
            className="mx-auto h-20 w-auto"
            src="/logo.png"
            alt="Your Company"
            width={100}
            height={100}
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {!signUp ? "Sign in to your account" : "Create an account"}
          </h2>
        </div>
        <div className="mt-2 md:mx-auto md:w-full md:max-w-sm ">
          <form onSubmit={(e) => handleNext(e)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  required
                  className="transition duration-300 indent-5 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 md:text-sm md:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  pattern="[a-zA-Z0-9]+"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  className="transition duration-300 indent-5 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 md:text-sm md:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="transition duration-300 indent-5 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 md:text-sm md:leading-6"
                />
              </div>
              {!signUp && (
                <div className="text-sm mt-3 text-right font-semibold ">
                  <span className="cursor-pointer text-green-400 hover:text-green-600  transition duration-300 ">
                    Forgot password?
                  </span>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                onClick={handleNext}
                className="transition duration-300 mt-2 flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                {!signUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
          <button
            onClick={handleGoogleAuth}
            className="flex hover:shadow-md item-center gap-3 justify-center w-full p-2 mt-3 border-gray-100 border-2 transition duration-300 shadow-md font-semibold text-sm text-gray-400 hover:shadow-gray-400"
          >
            <Image src="/google.png" width={20} height={20}></Image> Sign in
            with Google
          </button>

          <div
            className="mt-5 text-center text-sm text-gray-500"
            onClick={() => setSignUp(!signUp)}
          >
            {signUp ? "Already have an account? " : "Don't have an account?  "}
            <span className="font-semibold leading-6 text-green-400 hover:text-green-600 cursor-pointer">
              {signUp ? "Sign In" : "Sign Up"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
