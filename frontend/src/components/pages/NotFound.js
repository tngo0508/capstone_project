import React from "react";

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        height: "100%",
        width: "100%",
        paddingTop: "20rem",
        paddingBottom: "10rem",
      }}
    >
      <h1 className="display-4">
        <span className="text-danger">404</span> Page Not Found
      </h1>
      <p className="lead">Sorry, this page does not exist</p>
    </div>
  );
}
