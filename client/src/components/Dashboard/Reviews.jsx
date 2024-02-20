import { Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import { getMetricsHighlighted } from "@/zustand/store";
import { useStore } from "zustand";
const Reviews = ({ review, points }) => {
  // const bears = getMetricsHighlighted((state) => state);
  // console.log("Set:", bears);
  return (
    <Card
      variant="outlined"
      className="bg-transparent text-white border-white mt-3 md-3 p-3"
    >
      <div className="w-full flex justify-between ">
        <Typography className="font-bold text-sm">{review.name}</Typography>
        <Typography className="font-light text-green-400  text-sm">
          {review.points}safety points
        </Typography>
      </div>
      <p className="opacity-70 text-sm">{review.review}</p>
    </Card>
  );
};
export default Reviews;
