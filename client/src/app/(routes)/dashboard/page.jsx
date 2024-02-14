"use client";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { auth } from "@/firebase.config";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { getReviews } from "@/app/(routes)/dashboard/addReviews";
import Button from "@mui/material/Button";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import Modal from "@mui/material/Modal";
import addReviews from "./addReviews";
import toast, { Toaster } from "react-hot-toast";
import Metrics from "./metrics";

const page = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [inputValue, setInputValue] = useState({
    location: "",
    review: "",
    name: "",
  });
  const [expanded, setExpanded] = useState(true);
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

  console.log("Review", reviews);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("User not found");
        router.push("/auth");
      } else
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
    });
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <div className="h-screen w-screen ">
      <Navbar />
      <Toaster />
      <div
        className={`relative ${
          isAboveMediumScreens ? "flex h-[92.5vh]" : "flex flex-col h-[80vh]"
        } flex bg-green-300  `}
      >
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
          className={`absolute p-8 bg-gray-900 text-white transition duration-300 ${
            collapsed
              ? "translate-x-full hidden"
              : "grid place-content-start translate-x-0"
          } ${
            isAboveMediumScreens
              ? "right-0 h-full w-[25vw]"
              : "bottom-0 h-4/5 w-full"
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
          <Metrics />
          <Accordion
            defaultExpanded
            onChange={handleAccordionToggle}
            style={{
              background: "#f1f1f194",
              borderRadius: "10px",
              overflowY: "scroll",
              marginTop: "1rem",
            }}
          >
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              className="outline-transparent border-transparent  overflow-y-scroll"
            >
              Overview
            </AccordionSummary>
            <AccordionDetails
              className="outline-transparent border-transparent overflow-y-scroll p-3"
              style={{ background: "#f1f1f194" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <div className="mb-4">
            <h3 className="mt-2 text-green-400 text-lg font-semibold ">
              User Reviews
            </h3>
            <div
              className={`cursor-default overflow-y-scroll my-2 ${
                isAboveMediumScreens
                  ? expanded
                    ? "h-64"
                    : "h-96"
                  : expanded
                  ? "h-28"
                  : "h-52"
              }`}
            >
              {reviews &&
                reviews.map((review, index) => (
                  <div key={index} className="review">
                    <Reviews review={review} />
                  </div>
                ))}
            </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute  top-1/2   left-1/2  -translate-x-1/2 flex-col gap-2 flex -translate-y-1/2  w-96  bg-gray-100   border-2 rounded border-black  shadow-lg p-4">
              <Typography
                id="modal-modal-title"
                component="h2"
                className="text-base text-green-600 font-bold"
              >
                Add you review:
              </Typography>
              <TextField
                required
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(event) =>
                  setInputValue({ ...inputValue, name: event.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Location"
                required
                variant="outlined"
                onChange={(event) =>
                  setInputValue({ ...inputValue, location: event.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Review"
                required
                variant="outlined"
                onChange={(event) =>
                  setInputValue({ ...inputValue, review: event.target.value })
                }
              />
              <Button
                variant="contained"
                color="success"
                className="bg-green-700"
                onClick={() => {
                  if (
                    inputValue.location === "" ||
                    inputValue.name === "" ||
                    inputValue.review === ""
                  ) {
                    toast.error("Please fill all the details!");
                  } else {
                    addReviews({
                      location: inputValue.location,
                      name: inputValue.name,
                      review: inputValue.review,
                    });
                    setOpen(false);
                    toast.success("Thanks for your review!");
                  }
                }}
              >
                Add
              </Button>
            </Box>
          </Modal>
          <button
            onClick={handleOpen}
            className="text-green-400 text-center w-full absolute bottom-0 justify-center bg-gray-900 m-4 "
          >
            ADD REVIEWS <AddCircleOutlineRoundedIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
