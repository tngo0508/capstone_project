import React from "react";
import Spinner from "./Spinners";
import _ from "lodash";

const TextFairValue = ({ val }) => {
  if (val) {
    let msg;
    if (_.isEqual(val, "Undervalued")) {
      msg = <span className="badge badge-success">Undervalued</span>;
    } else {
      msg = <span className="badge badge-danger">Overvalued</span>;
    }

    return (
      <div className="container text-center">
        <div className="alert alert-light">
          <h3>
            Base on our evaluation, the stock is
            <span>&nbsp;</span>
            {msg}
          </h3>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default TextFairValue;
