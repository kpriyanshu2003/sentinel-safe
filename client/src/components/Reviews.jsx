import { Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";

const Reviews = () => {
  return (
    <Card
      variant="outlined"
      className="bg-transparent text-white border-white mt-3 md-3"
    >
      <Typography className="font-bold text-sm">Akangkha Sarkar</Typography>
      <hr className="pb-1" />
      <p className="opacity-70 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. cia vitae totam
        eveniet iste inventore
      </p>
    </Card>
  );
};
export default Reviews;