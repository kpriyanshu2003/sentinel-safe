"use client";
import { auth } from "@/firebase.config";
import Navbar from "@/components/Navbar";
import MenuIcon from "@mui/icons-material/Menu";
import { getReviews } from "@/components/Dashboard/addReviews";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Toaster } from "react-hot-toast";
// import Location from "@/components/Location";
import { useMediaQuery } from "@mui/material";
const page = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    getReviews()
      .then((reviewsData) => {
        setReviews(reviewsData);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

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
    setOpen(true);
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in. Get the display name
      const username = user.displayName;
      console.log("Username: ", username);
    } })
  const handleClose = () => setOpen(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  
  return (  
   
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <Toaster />
      <div className="relative flex h-[92.5vh] md:flex-col md:h-[86vh bg-green-300">
        {/* <Location /> */}
      <div
        className={`relative ${
          isAboveMediumScreens ? "flex h-[92.5vh]" : "flex flex-col h-[86vh]"
        } flex bg-green-300  `}
      >
        {/* <Location /> */}
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
          reviews={reviews}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
    </div>
  );
};

export default page
