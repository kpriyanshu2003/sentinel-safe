import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("SignOut Success");
        router.push("/");
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }
  return (
    <div>
      <div className="w-screen h-14 shadow-gray-900 shadow-lg justify-between flex items-center pr-8 pl-8 text-center">
        <Image
          src="/logo1.png"
          alt="web-app logo"
          className="cursor-pointer"
          width={150}
          height={50}
          onClick={() => router.push("/")}
        />
        <div className="flex gap-3 items-center">
          <Link
            href="/chat"
            className="transition-all duration-300 flex items-center bg-emerald-600 justify-center cursor-pointer  rounded text-white p-2 font-bold  hover:bg-emerald-800 hover:text-white active:bg-emerald-700 h-8 "
          >
            Community Chat
          </Link>
          <div
            className="transition-all duration-300 flex items-center border-emerald-600 justify-center cursor-pointer border-2 rounded text-emerald-600 p-2 font-bold  hover:bg-gray-300 hover:text-black active:bg-emerald-700 h-8"
            onClick={() => handleSignOut()}
          >
            Log Out
          </div>
          <div
            className="rounded-full  w-12 h-12 border-emerald-600 border-2 bg-cover bg-center"
            style={{ backgroundImage: "url('/avatar2.svg')" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
