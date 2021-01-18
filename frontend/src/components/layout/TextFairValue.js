import React from "react";

const TextFairValue = ({ val }) => {
  let msg;
  if (val.localeCompare("Undervalued")) {
    msg = <span className="badge badge-success">Undervalued</span>;
  } else {
    msg = <span className="badge badge-danger">Overvalued</span>;
  }

  return (
    <div className="container text-center">
      <div className="alert alert-light">
        <h3>
          Base on our prediction, the stock is
          <span>&nbsp;</span>
          {msg}
        </h3>
      </div>
    </div>
  );
};

export default TextFairValue;
