import React, { useEffect } from "react";
import Link from "next/link";
import { Popover, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const router = useRouter();
  function handleSignOut() {
    localStorage.removeItem("image");
    signOut(auth)
      .then(() => {
        console.log("SignOut Success");
        router.push("/");
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }
  const image =
    typeof window !== "undefined" ? localStorage.getItem("checkout") : null;
  return (
    <div
      className={`w-screen  shadow-gray-900 shadow-lg justify-between flex items-center pr-8 pl-8 text-center   ${
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
        className={`flex gap-3 items-center ${
          isAboveMediumScreens
            ? ""
            : "w-full justify-around m-3  border-gray-400 border-t p-3"
        }`}
      >
        <Link href="/chat">
          <div className="transition-all duration-300 flex items-center bg-emerald-600 justify-center cursor-pointer  rounded text-white p-2 font-bold  hover:bg-emerald-800 hover:text-white active:bg-emerald-700 h-8 text-sm w-auto">
            Community Chat
          </div>
        </Link>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onMouseLeave={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Card className="p-3 border-black rounded border text-sm">
            Username : Akangkha <br></br> Email: {(typeof window !== 'undefined') ? localStorage.getItem("email") : null }
          </Card>
        </Popover>
        <Link href="/auth">
          <div className="flex  items-center border-emerald-600 justify-center cursor-pointer border-2 rounded text-emerald-600 p-2 font-bold  hover:bg-gray-300 hover:text-black active:bg-emerald-700 h-8 text-sm w-auto">
            Log Out
          </div>
        </Link>

        <div
          className="rounded-full  w-12 h-12 border-emerald-600 border-2 bg-cover bg-center"
          style={{ backgroundImage: "url('/avatar2.svg')" }}
          onMouseEnter={handleHover}
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
