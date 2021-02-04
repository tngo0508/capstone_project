import React, { useRef, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import classnames from "classnames";

import DeerParticles from "../layout/DeerParticles";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
} from "mdbreact";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [msg, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation check
    setError("");
    setEmailError("");

    try {
      setMessage("");
      setError("");
      setEmailError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Please check your email inbox for further instruction");
    } catch {
      if (emailRef.current.value === "") {
        setEmailError("Please enter email");
      }

      setError("Failed to reset password.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container justify-content-center" align="center">
        <DeerParticles />
        <h3>Enter the email address associated with your BVA account.</h3>
      </div>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <MDBCard>
            <div className="header pt-3 purple-gradient">
              <MDBRow className="d-flex justify-content-center">
                <h3 className="white-text mb-3 pt-3 font-weight-bold">
                  <MDBIcon icon="key" /> Password Assistance
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              {error && <Alert variant="danger">{error}</Alert>}
              {msg && <Alert variant="success">{msg}</Alert>}

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
                  <Button
                    disabled={loading}
                    variant="secondary"
                    className="w-100"
                    type="Submit"
                  >
                    Reset Password
                  </Button>
                </div>
              </Form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <Button href="/login" className="blue-gradient">
                    Log In
                  </Button>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </div>
      </Container>
    </>
  );
}
