import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import addReviews, { getReviews } from "../../lib/addReviews";
import toast, { Toaster } from "react-hot-toast";
import Metrics from "./metrics";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { getMetricsHighlighted, useStore } from "@/zustand/store";
import Image from "next/image";
import Reviews from "./Reviews";
const Sidebar = ({
  handleOpen,
  handleClose,
  collapsed,
  setCollapsed,
  setOpen,
  open,
}) => {
  const { latitude, longitude } = useStore();
  const [expanded, setExpanded] = useState(true);

  const [reviews, setReviews] = useState();
  const [value, setValue] = useState(2.5);
  const labels = {
    1: "Risky",
    2: "Poor",
    3: "Neutral",
    4: "Safe",
    5: "Excellent",
  };

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
  const fetchReviews = async (location) => {
    try {
      const reviewsData = await getReviews({ location });
      return reviewsData;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return null;
    }
  };
  useEffect(() => {
    setMetrics(bears);

    const fetchData = async () => {
      if (latitude && metrics) {
        const reviewsData = await fetchReviews(metrics.campusName);
        setReviews(reviewsData);
      } else {
        setReviews(null);
      }
    };

    fetchData();
  }, [bears, latitude, metrics]);

  return (
    <div
      className={`absolute p-8 bg-gray-900 flex flex-col justify-center text-white transition duration-300 z-10 bottom-0 h-[75vh] w-full ${
        collapsed
          ? "translate-x-full hidden"
          : "grid place-content-start translate-x-0"
      } lg:right-0 lg:h-full lg:w-[25vw]`}
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

      <div className="border  flex items-center justify-evenly rounded-lg p-3 text-white text-bold">
        {latitude ? (
          <Metrics
            peopleCount={metrics.peopleCount}
            avgSpeed={metrics.avgSpeed}
          />
        ) : (
          <Typography>
            Click on the highlighted area to fetch current metrics of the campus
            !{" "}
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
          Overview{" "}
          {longitude && metrics.avgSpeed ? (
            <span>&nbsp; of {metrics.campusName}</span>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails
          className="outline-transparent border-transparent overflow-y-scroll p-3 flex justify-around"
          style={{ background: "#f1f1f194" }}
        >
          <Typography className="font-extralight flex  gap-1">
            {longitude && metrics.avgSpeed ? (
              <>
                safety rating:{" "}
                <Rating
                  name="read-only"
                  value={metrics.riskRating}
                  precision={0.1}
                  readOnly
                />
                {labels[metrics.riskRating]}
              </>
            ) : (
              "Click on the highlighted area to fetch"
            )}{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <div className="mb-4 overflow-y-scroll">
        {reviews && (
          <h3 className=" text-green-400 text-lg font-semibold mt-2">
            User Reviews
          </h3>
        )}
        <div
          className={`cursor-default overflow-y-scroll my-2 ${
            expanded ? "lg:h-full" : "lg:h-96 "
          }`}
        >
          {reviews ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <Reviews review={review} />
              </div>
            ))
          ) : (
            <div
              className="items-center flex 
               h-full
              flex-col justify-center"
            >
              <Image
                src="/image.png"
                className="hidden lg:flex"
                style={{ objectFit: "contain" }}
                width={150}
                height={200}
              />
              <Image
                src="/location.gif"
                className="lg:hidden flex"
                width={150}
                height={80}
              />
              <Typography className="text-center text-green-400 font-semibold">
                Empowering Communities, Ensuring your Safety{" "}
              </Typography>
            </div>
          )}
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
          {metrics && metrics.campusName && (
            <TextField
              id="outlined-basic"
              label={metrics.campusName}
              disabled
              variant="outlined"
              onChange={(event) =>
                setInputValue({ ...inputValue, location: event.target.value })
              }
            />
          )}
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
                inputValue.email === "" ||
                inputValue.name === "" ||
                inputValue.review === ""
              ) {
                toast.error("Please fill all the details!");
              } else {
                latitude &&
                  addReviews({
                    email: inputValue.email,
                    name: inputValue.name,
                    review: inputValue.review,
                    location: metrics.campusName,
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
        className={`${
          latitude ? "text-green-400" : "text-gray-400"
        } text-center w-full absolute bottom-10 lg:bottom-0 justify-center z-10 pb-4 pt-4 mt-4 bg-gray-900 item-center`}
      >
        ADD REVIEWS <AddCircleOutlineRoundedIcon fontSize="medium" />
      </button>
    </div>
  );
};

export default Sidebar;
