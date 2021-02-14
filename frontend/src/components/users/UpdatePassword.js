import React, { useRef, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import classnames from "classnames";
import { Link, useHistory } from "react-router-dom";
import DeerParticles from "../layout/DeerParticles";
import { MDBRow, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import TokenExpired from "../layout/TokenExpired";

export default function UpdatePassword() {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");
  const [isTokenExpired, setTokenExpired] = useState(false);
  const history = useHistory();
  // const promises = [];

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation check
    setError("");
    setPasswordError("");
    setConfirmedPasswordError("");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setConfirmedPasswordError("Password do not match");
      // return setError("Password do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    //check if all promises run successfully or not
    Promise.all(promises)
      .then(() => {
        setTokenExpired(false);
        history.push("/user");
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
        setTokenExpired(true);
        setError("Failed to update your password");
      })
      .finally(() => {
        // console.log("doesn't change anything");
        setLoading(false);
      });

    setTokenExpired(false);
  };

  return (
    <>
      <div className="container justify-content-center" align="center">
        <DeerParticles />
        <h3>Update your account information here</h3>
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
                  <MDBIcon icon="edit" /> Update Password
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form noValidate onSubmit={handleSubmit}>
                <div className="grey-text my-3">
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Please enter the new password"
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
                      placeholder="Please enter the confirmed password"
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
                  <div className="d-flex justify-content-end">
                    <Button
                      disabled={loading}
                      variant="secondary"
                      type="Submit"
                    >
                      Update
                    </Button>
                    <Link className="btn btn-light" to="/user">
                      Cancel
                    </Link>
                  </div>
                </div>
              </Form>
            </MDBCardBody>
          </MDBCard>
        </div>
      </Container>
      {isTokenExpired && <TokenExpired />}
    </>
  );
}
