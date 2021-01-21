import React from "react";
import loading from "./loading.gif";

function Spinner() {
  return (
    <div>
      <div className="container w-50">
        <div className="alert alert-info text-center">
          Please wait a few seconds...
        </div>
      </div>
      <img
        src={loading}
        alt="Gathering Info..."
        className="rounded mx-auto d-block"
      />
    </div>
  );
}

export default Spinner;
