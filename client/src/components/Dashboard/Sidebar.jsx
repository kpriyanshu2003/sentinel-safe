import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Reviews from "./Reviews";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import addReviews from "../../app/lib/addReviews";
import toast, { Toaster } from "react-hot-toast";
import Metrics from "./metrics";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import { getMetricsHighlighted } from "@/zustand/store";

const Sidebar = ({
  handleOpen,
  handleClose,
  collapsed,
  setCollapsed,
  reviews,
  setOpen,
  open,
}) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [expanded, setExpanded] = useState(true);
  const [value, setValue] = useState(2.5);
  const labels = {
    1: "Not Safe+",
    2: "Poor",
    3: "Neutral",
    4: "Safe",
    5: "Excellent",
  };
  function getLabelText(value) {
    return labels[value];
  }

  const [inputValue, setInputValue] = useState({
    location: "",
    review: "",
    name: "",
    email: "",
  });
  const [metrics, setMetrics] = useState();
  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };
  const bears = getMetricsHighlighted((state) => state);
  useEffect(
    () => setMetrics(bears[0]),

    [bears]
  );

  return (
    <div
      className={`absolute p-8 bg-gray-900 text-white transition duration-300  ${
        collapsed
          ? "translate-x-full hidden"
          : "grid place-content-start translate-x-0"
      } ${
        isAboveMediumScreens
          ? "right-0 h-full w-[25vw]"
          : "bottom-0 h-[75vh] w-screen"
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
        {metrics ? (
          <Metrics
            peopleCount={bears[0].peopleCount}
            avgSpeed={bears[0].avgSpeed}
          />
        ) : (
          <Typography>
            Click on the highlighted area to fetch current metrics !{" "}
          </Typography>
        )}
      </div>
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
          className="outline-transparent border-transparent overflow-y-scroll p-3 flex justify-around"
          style={{ background: "#f1f1f194" }}
        >
          <Rating name="read-only" value={value} precision={0.1} readOnly />
          {value !== null && (
            <Typography className="font-extralight">
              {labels[Math.floor(value)]} safety conditions
            </Typography>
          )}
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
              ? "h-40"
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
        <Box className="absolute  top-1/2   left-1/2  -translate-x-1/2  flex  flex-col gap-2 -translate-y-1/2  w-96  bg-gray-100   border-2 rounded border-black  shadow-lg p-4">
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
            label="Email"
            required
            variant="outlined"
            onChange={(event) =>
              setInputValue({ ...inputValue, email: event.target.value })
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
                  campusName: inputValue.location,
                  email: inputValue.email,
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
        className="text-green-400 text-center  w-full absolute bottom-0 justify-center pb-4 mt-4 bg-gray-900 item-center"
      >
        ADD REVIEWS <AddCircleOutlineRoundedIcon fontSize="medium" />
      </button>
    </div>
  );
};

export default Sidebar;
