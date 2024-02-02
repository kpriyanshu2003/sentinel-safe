import React, { useEffect } from "react";
import Link from "next/link";
import { Popover } from "@mui/material";
import Card from "@mui/material/Card";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  const image = localStorage.getItem("image");

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
          <Link href="/chat">
            <div className="transition-all duration-300 flex items-center bg-emerald-600 justify-center cursor-pointer  rounded text-white p-2 font-bold  hover:bg-emerald-800 hover:text-white active:bg-emerald-700 h-8 ">
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
              Username : Akangkha <br></br> Email : akangkhasarkar@gmail.com
            </Card>
          </Popover>
          <Link href="/auth">
            <div className="flex  items-center border-emerald-600 justify-center cursor-pointer border-2 rounded text-emerald-600 p-2 font-bold  hover:bg-gray-300 hover:text-black active:bg-emerald-700 h-8 ">
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
    </div>
  );
};

export default Navbar;
