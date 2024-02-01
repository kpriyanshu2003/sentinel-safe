import React from "react";
import Link from "next/link";
import { Popover } from "@mui/material";
import Card from "@mui/material/Card";
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

  return (
    <div>
      <div className="w-screen h-14 shadow-inner shadow-gray-900 shadow-lg justify-between flex items-center pr-8 pl-8 text-center">
        <img src="/logo1.png" alt="web app logo" width="150px" />
        <div className="flex gap-3 items-center">
          <div className="flex  items-center bg-emerald-600 justify-center cursor-pointer  rounded text-white p-2 font-bold  hover:bg-emerald-800 hover:text-white active:bg-emerald-700 h-8 ">
            Community Chat
          </div>
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
