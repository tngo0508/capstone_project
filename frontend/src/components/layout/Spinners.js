import React from "react";
import finding from "./finding.gif";

function Spinner() {
  return (
    <div>
      <img src={finding} alt="Gathering Info..." />
    </div>
  );
}

export default Spinner;
