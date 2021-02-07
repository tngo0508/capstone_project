import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import classnames from "classnames";
import Particles from "react-particles-js";
import { Link, useHistory } from "react-router-dom";
import { MDBRow, MDBCard, MDBAnimation, MDBIcon } from "mdbreact";
import Deer from "../../img/deer.svg";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation check
    setError("");
    setEmailError("");
    setPasswordError("");
    setConfirmedPasswordError("");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setConfirmedPasswordError("Password do not match");
      // return setError("Password do not match");
    }

    try {
      setError("");
      setEmailError("");
      setPasswordError("");
      setConfirmedPasswordError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      if (emailRef.current.value === "") {
        setEmailError("Please enter email");
      }
      if (passwordRef.current.value === "") {
        setPasswordError("Please enter password");
      }
      if (passwordConfirmRef.current.value === "") {
        setConfirmedPasswordError("Please enter confirmed password");
      }
      setError("Failed to create an account");
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <MDBAnimation type="fadeInUp" delay=".3s">
          <div className="container">
            <Particles params={options} />
            <h3>Analyze your favorite brand and more</h3>
            <p>
              Let us provide you key insights about the current market and help
              your business grow by developing better investment strategies.
            </p>
          </div>
        </MDBAnimation>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <MDBAnimation type="fadeInDown" delay=".3s">
            <MDBCard>
              <div className="header pt-3 blue-gradient">
                <MDBRow className="d-flex justify-content-center">
                  <h3 className="white-text mb-3 pt-3 font-weight-bold">
                    <MDBIcon icon="users" /> Sign Up
                  </h3>
                </MDBRow>
              </div>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form noValidate onSubmit={handleSubmit}>
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
                  <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      required
                      className={classnames("", {
                        "is-invalid": confirmedPasswordError,
                      })}
                    ></Form.Control>
                    {(error || confirmedPasswordError) && (
                      <div className="invalid-feedback">
                        {confirmedPasswordError}
                      </div>
                    )}
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="Submit">
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </MDBCard>
            <hr />
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </MDBAnimation>
        </div>
      </Container>
    </>
  );
}
