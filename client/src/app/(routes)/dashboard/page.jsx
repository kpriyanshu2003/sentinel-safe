"use client";
import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Reviews from "@/components/Reviews";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Navbar from "@/components/Navbar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
const page = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className=" h-screen w-screen">
      <Navbar />
      <div className="flex w-screen" style={{ height: "92%" }}>
        <div
          className={`justify-center h-full ${
            collapsed ? "w-screen" : "w-5/6"
          }`}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d5289.969867300224!2d85.81514094435992!3d20.35922793675595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d20.362278699999997!2d85.8178939!4m5!1s0x3a19091813dab8d5%3A0xa033051ccddbbcbc!2sKalinga%20Institute%20of%20Industrial%20Technology%2C%20KIIT%20Rd%2C%20Patia%2C%20Bhubaneswar%2C%20Odisha%20751024!3m2!1d20.3555462!2d85.8161006!5e0!3m2!1sen!2sin!4v1706640417804!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {
          <div
            className={`flex flex-col p-8 h-full bg-gray-900 text-center text-white justify-center ${
              collapsed ? "w-0 " : "w-2/6"
            }`}
          >
            {collapsed ? (
              <MenuOpenIcon
                onClick={toggleCollapse}
                className="hover:text-green-200"
              />
            ) : (
              <>
                <CancelPresentationIcon
                  sx={{ marginBottom: "6px" }}
                  onClick={toggleCollapse}
                  className="hover:text-green-200"
                />
                <div className="flex gap-4 items-center justify-center border rounded p-3 text-white text-bold">
                  <DirectionsWalkIcon className="text-green-400" />
                  3 mph
                  <PeopleAltIcon className="text-green-400" /> 06
                </div>
                <Accordion defaultExpanded style={{ background: "#f1f1f194" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="outline-transparent border-transparent"
                  >
                    Overview
                  </AccordionSummary>
                  <AccordionDetails
                    className="outline-transparent border-transparent"
                    style={{ background: "#f1f1f194" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </AccordionDetails>
                </Accordion>
                <div className="overflow-y-scroll mb-4">
                  <h3 className="  mt-2 text-green-400 text-lg font-semibold">
                    User Reviews
                  </h3>
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                </div>
                scroll down to read more ↓
              </>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default page;
