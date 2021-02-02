import React, { useRef, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import classnames from "classnames";
import { Link, useHistory } from "react-router-dom";
import Particles from "react-particles-js";
import { MDBRow, MDBCard, MDBCardBody, MDBModalFooter } from "mdbreact";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();
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
      url: "deer.svg",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation check
    setError("");
    setEmailError("");
    setPasswordError("");

    try {
      setError("");
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      if (emailRef.current.value === "") {
        setEmailError("Please enter email");
      }
      if (passwordRef.current.value === "") {
        setPasswordError("Please enter password");
      }

      setError("Failed to sign-in. Please check your email and password.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container justify-content-center" align="center">
        <Particles params={options} />
        <h3>Welcom to BrandValueAnalysis</h3>
      </div>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <MDBCard>
            <div className="header pt-3 aqua-gradient">
              <MDBRow className="d-flex justify-content-center">
                <h3 className="white-text mb-3 pt-3 font-weight-bold">
                  Log in
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form noValidate onSubmit={handleSubmit}>
                <div className="grey-text my-3">
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      required
                      autoFocus={true}
                      className={classnames("", {
                        "is-invalid": emailError,
                      })}
                    ></Form.Control>
                    {(error || emailError) && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      required
                      className={classnames("", {
                        "is-invalid": passwordError,
                      })}
                    ></Form.Control>
                    {(error || passwordError) && (
                      <div className="invalid-feedback">{passwordError}</div>
                    )}
                  </Form.Group>
                  <Button
                    disabled={loading}
                    variant="info"
                    className="w-100"
                    type="Submit"
                  >
                    Log In
                  </Button>
                </div>
              </Form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>
                    New to BVA? <Link to="/signup">Sign Up</Link>
                  </p>
                  <p>Forgot Password?</p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </div>
      </Container>
    </>
  );
}
