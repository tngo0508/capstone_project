import React, { useRef, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import classnames from "classnames";
import { Link, useHistory } from "react-router-dom";
import DeerParticles from "../layout/DeerParticles";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBAnimation,
} from "mdbreact";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

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
      history.push("/findstock");
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
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <MDBAnimation type="bounceInLeft">
            <MDBCard>
              <div className="header pt-3 aqua-gradient">
                <MDBRow className="d-flex justify-content-center">
                  <h3 className="white-text mb-3 pt-3 font-weight-bold">
                    <MDBIcon icon="lock" /> Log in
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
                    <p>
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBAnimation>
        </div>

        <MDBAnimation
          type="zoomIn"
          className="container justify-content-center d-none d-md-block"
          align="center"
        >
          <DeerParticles />
          <h3>Welcom to BrandValueAnalysis</h3>
        </MDBAnimation>
      </Container>
    </>
  );
}
