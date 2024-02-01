"use client";

import { auth } from "@/firebase.config";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const page = () => {
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) console.log("User not found");
      else console.log(user.displayName, user.email);
    });
  }, []);
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="relative flex bg-green-300 h-[92.5vh]">
        <iframe
          className={`w-screen h-full transition-all duration-500`}
          src="https://maps.google.com/maps?q=kiit%20campus%206&t=k&z=15&ie=UTF8&iwloc=&output=embed"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <MenuIcon
          onClick={() => setCollapsed(!collapsed)}
          className="hover:text-green-200 bg-gray-900 text-white p-2 rounded-lg w-12 h-12 cursor-pointer absolute top-5 right-5"
        />
        <div
          className={`absolute p-8 h-full bg-gray-900 text-white transition duration-300 w-[25vw] right-0 ${
            collapsed
              ? "translate-x-full"
              : " grid place-content-start translate-x-0"
          }`}
        >
          <CloseIcon
            sx={{
              marginBottom: "1rem",
              height: "30px",
              width: "30px",
            }}
            onClick={() => setCollapsed(!collapsed)}
            className="hover:text-green-200 cursor-pointer"
          />
          <div className="border flex items-center justify-evenly rounded-lg p-3 text-white text-bold">
            <div className="flex gap-2 items-center justify-center ">
              <PeopleAltIcon className="text-green-400" />
              <span>06</span>
            </div>
            <div className="flex gap-2 items-center justify-center ">
              <DirectionsWalkIcon className="text-green-400" />
              <span>3 kmph</span>
            </div>
          </div>
          <Accordion
            defaultExpanded
            style={{
              background: "#f1f1f194",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "1rem",
              position:"sticky"
            }}
          >
            <AccordionSummary
              
              aria-controls="panel1-content"
              id="panel1-header"
              className="outline-transparent border-transparent"
            >
              Overview
            </AccordionSummary>
            <AccordionDetails
              className="outline-transparent border-transparent"
              style={{ background: "#f1f1f194"}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <div className="mb-4">
            <h3 className="mt-2 text-green-400 text-lg font-semibold">
              User Reviews
            </h3>
            <div className="h-68 cursor-default overflow-scroll my-2">
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
             
            </div>
          </div>
          <span className="text-gray-400 text-center w-full absolute bottom-0  bg-gray-900">
            scroll down to read more <KeyboardArrowDownIcon />
          </span>
        </div>
      </div>
    </div>
   
  );
};

export default page;
