import React from "react";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const metrics = () => {
  return (
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
  );
};

export default metrics;
