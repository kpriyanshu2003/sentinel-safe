import { Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";

const Reviews = ({ review }) => {
  return (
    <Card
      variant="outlined"
      className="bg-transparent text-white border-white mt-3 md-3 p-3"
    >
      <Typography className="font-bold text-sm">{review.name}</Typography>

      <p className="opacity-70 text-sm">{review.review}</p>
    </Card>
  );
};
export default Reviews;
