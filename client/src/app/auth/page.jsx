"use client";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { process } from "process";
import { useState } from "react";
import GoogleButton from "react-google-button";
export default function Authentication() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
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
          <img
            className="mx-auto h-20 w-auto"
            src="/logo.png"
            alt="Your Company"
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {!signUp ? "Sign in to your account" : "Sign Up your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
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
                {!signUp && (
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-green-400 hover:text-green-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                {!signUp ? "Sign in" : "Sign UP"}
              </button>
            </div>
          </form>
          <GoogleButton
            style={{ width: "100%", margin: "10px 0px" }}
            type="light"
            onClick={handleGoogleAuth}
          />
          {!signUp && (
            <p
              className="mt-5 text-center text-sm text-gray-500"
              onClick={() => setSignUp(true)}
            >
              Don't have an account?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-green-400 hover:text-green-600"
              >
                Sign Up Now !
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
