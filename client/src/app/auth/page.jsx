"use client";
import Image from "next/image";
import Link from "next/link";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";

export default function Authentication() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);

  const handleChange = (event) => {
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!signUp) {
      signInWithEmailAndPassword(auth, input.email, input.password)
        .then(() => {
          console.log("Logged In with", input.email);
          router.push("/dashboard");
        })
        .catch((error) => console.log(error.message));
    } else {
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((cred) => {
          console.log("User: ", cred.user.email);
          router.push("/dashboard");
        })
        .catch((err) => console.log(err.message));
    }
    console.log(input);
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100">
      <div
        className="flex flex-1 flex-col justify-center  p-10 lg:px-8 shadow-xl bg-white rounded h-screen  sm:h-auto sm:w-auto w-screen"
        style={{ minWidth: "400px" }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6" onSubmit={handleNext} method="POST">
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
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  className="transition duration-300 indent-5 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
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
                  className="transition duration-300 indent-5 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
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
                className="transition duration-300 flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                {!signUp ? "Sign in" : "Sign UP"}
              </button>
            </div>
          </form>
          <GoogleButton
            style={{
              width: "100%",
              margin: "10px 0px",
              borderRadius: "5px",
              padding: "0px",
            }}
            type="light"
            onClick={handleGoogleAuth}
          />

          <span
            className="mt-5 text-center text-sm text-gray-500"
            onClick={() => setSignUp(!signUp)}
          >
            {signUp ? "Already have an account? " : "Don't have an account?  "}
            <span className="font-semibold leading-6 text-green-400 hover:text-green-600 cursor-pointer">
              {signUp ? "Sign In" : "Sign Up"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
