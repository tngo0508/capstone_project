import React from "react";
import Particles from "react-particles-js";
import Deer from "../../img/deer.svg";

export default function DeerParticles() {
  const options = {
    fps_limit: 28,
    particles: {
      color: {
        value: "#2e3033",
      },
      collisions: {
        enable: false,
      },
      number: {
        value: 200,
        density: {
          enable: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 30,
        opacity: 0.4,
        color: {
          value: "#2e3033",
        },
      },
      move: {
        speed: 1,
      },
      opacity: {
        anim: {
          enable: true,
          opacity_min: 0.05,
          speed: 1,
          sync: false,
        },
        value: 1,
      },
    },
    polygon: {
      enable: true,
      scale: 0.4,
      type: "inline",
      move: {
        radius: 10,
      },
      url: Deer,
      inline: {
        arrangement: "equidistant",
      },
      draw: {
        enable: true,
        stroke: {
          color: "rgba(255, 255, 255, .2)",
          width: 1,
        },
      },
    },
    retina_detect: false,
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
      },
      modes: {
        bubble: {
          size: 6,
          distance: 40,
        },
      },
    },
  };

  return (
    <>
      <Particles params={options} />
    </>
  );
}
