import React from "react";
import NotFoundImg from "../../img/404.png";

export default function NotFound() {
  return (
    <div className="container">
      <div className="text-center m-5">
        <h1 className="display-4">
          <span className="text-danger">404</span> Page Not Found
        </h1>
        <p className="lead">Sorry, this page does not exist</p>
      </div>
      <img className="img-fluid" src={NotFoundImg} alt="" />
    </div>
  );
}
