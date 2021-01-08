import React from "react";
import loading from "./loading.gif";

function Spinner() {
  return (
    <div>
      <img src={loading} alt="Gathering Info..." />
    </div>
  );
}

export default Spinner;
