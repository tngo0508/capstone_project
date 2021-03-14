import React from "react";
import loading from "./loading.gif";

function Spinner() {
  return (
    <div>
      <img
        src={loading}
        alt="Gathering Info..."
        className="rounded mx-auto d-block spinner"
      />
    </div>
  );
}

export default Spinner;
