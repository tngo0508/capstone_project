import React from "react";
import Particles from "react-particles-js";

export default function About() {
  return (
    <div
      className="container"
      style={{
        height: "100%",
        width: "100%",
        paddingTop: "10rem",
        paddingBottom: "10rem",
      }}
    >
      <h1 className="display-4">ABout My App</h1>
      <p className="lead">
        Welcome to BVA, this is my capstone project for master's degree at CSUF{" "}
        <br />
        The purpose of this application is to provide investors key insights and
        estimate value of the brands for investment decisions. It keeps track of
        pricing data for competitive advantages and helps businesses develop
        their investment strategies.
      </p>
      <p className="text-secondary">Version 1.0.0</p>
      <Particles
        params={{
          particles: {
            color: {
              value: "#000",
            },
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            line_linked: {
              color: {
                value: "#000",
              },
            },
            size: {
              value: 4,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
            onclick: {
              enable: true,
              mode: "push",
            },
          },
        }}
      />
    </div>
  );
}
