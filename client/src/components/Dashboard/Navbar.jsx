import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { Popover, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const handleHover = (event) => {
    setAnchorEl(!anchorEl);
  };

  useEffect(() => {
    if (typeof window !== "undefined")
      setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  function handleSignOut() {
    localStorage.removeItem("userDetails");
    signOut(auth)
      .then(() => {
        console.log("SignOut Success");
        router.push("/auth");
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }
  const image =
    typeof window !== "undefined" ? localStorage.getItem("checkout") : null;
  return (
    <div
      className={`w-screen justify-between flex items-center pr-8 pl-8 text-center   ${
        isAboveMediumScreens ? "h-14" : "flex-col h-auto"
      }`}
    >
      <Image
        src="/logo1.png"
        alt="web-app logo"
        className="cursor-pointer p-3"
        width={150}
        height={50}
        onClick={() => router.push("/")}
        priority={true}
      />
      <div
        className={`flex lg:gap-3 lg:items-center  lg:w-fit  w-full justify-around m-3  border-gray-400 border-t p-3
        }`}
      >
        {usePathname() == "/dashboard" ? (
          <Link href="/chat">
            <div className="transition-all duration-300 flex items-center bg-emerald-600 justify-center cursor-pointer  rounded text-white p-2 font-bold  hover:bg-emerald-800 hover:text-white active:bg-emerald-700 h-8 text-sm w-auto">
              Community Chat
            </div>
          </Link>
        ) : (
          <Link href="/dashboard">
            <div className="transition-all duration-300 flex items-center bg-emerald-600 justify-center cursor-pointer  rounded text-white p-2 font-bold  hover:bg-emerald-800 hover:text-white active:bg-emerald-700 h-8 text-sm w-auto">
              Dashboard
            </div>
          </Link>
        )}

        {anchorEl && (
          <Card className="p-3 border-black rounded border text-sm z-20 absolute top-32 lg:top-12 transition-all duration-1500 right-[2rem]">
            username:{" "}
            {userDetails.displayName != null && (
              <span>{userDetails.displayName}</span>
            )}
            <br></br>
            Email:{userDetails.email && <span>{userDetails.email}</span>}
          </Card>
        )}

        <div
          className="flex  items-center border-emerald-600 justify-center cursor-pointer border-2 rounded text-emerald-600 p-2 font-bold  hover:bg-gray-300 hover:text-black active:bg-emerald-700 h-8 text-sm w-auto"
          onClick={() => handleSignOut()}
        >
          Log Out
        </div>

        <div className="rounded-full  w-12 h-12 border-emerald-600 border-2 bg-cover bg-center">
          <Image
            src={userDetails.photoURL ? userDetails.photoURL : "/avatar.png"}
            alt="user profile"
            className="rounded-full"
            width={50}
            height={50}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
