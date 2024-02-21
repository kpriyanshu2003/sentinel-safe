"use client";
import { auth } from "@/firebase.config";
import Navbar from "@/components/Dashboard/Navbar";
import MenuIcon from "@mui/icons-material/Menu";
import { getReviews } from "@/app/lib/addReviews";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Dashboard/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import Location from "@/components/Dashboard/Location";
import { useStore } from "@/zustand/store";
const page = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = React.useState(false);
  const { latitude, longitude } = useStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("User not found");
        router.push("/");
      } else {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      }
    });
  }, []);

  const handleOpen = () => {
    latitude ? setOpen(true) : toast.error("Select the highlighted area");
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const username = user.displayName;
      console.log("Username: ", username);
    }
  });
  const handleClose = () => setOpen(false);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <Toaster />

      <div className="relative flex xl:flex-row xl:h-[92.5vh] flex-col h-[86vh] bg-green-300 ">
        <Location />
        <MenuIcon
          onClick={() => setCollapsed(!collapsed)}
          sx={{ fontSize: "40px" }}
          className="hover:text-green-200 bg-gray-900 text-white p-2 rounded-lg  cursor-pointer absolute top-5 right-5"
        />
        <Sidebar
          handleClose={handleClose}
          handleOpen={handleOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default page;
