import React, { useRef, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import classnames from "classnames";
import { Link, useHistory } from "react-router-dom";
import DeerParticles from "../layout/DeerParticles";
import { MDBRow, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import TokenExpired from "../layout/TokenExpired";

export default function UpdateUser() {
  const emailRef = useRef();
  const { currentUser, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isTokenExpired, setTokenExpired] = useState(false);
  const history = useHistory();
  // const promises = [];

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation check
    setError("");
    setEmailError("");

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
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
        setError("Failed to update your account");
      })
      .finally(() => {
        // console.log("doesn't change anything");
        setLoading(false);
      });

    setTokenExpired(false);
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <MDBCard>
            <div className="header pt-3 peach-gradient">
              <MDBRow className="d-flex justify-content-center">
                <h3 className="white-text mb-3 pt-3 font-weight-bold">
                  <MDBIcon icon="edit" /> Update Email
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
                      defaultValue={currentUser.email}
                      className={classnames("", {
                        "is-invalid": emailError,
                      })}
                    ></Form.Control>
                    {(error || emailError) && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button disabled={loading} variant="orange" type="Submit">
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
      <div className="container justify-content-center" align="center">
        <div className="d-none d-md-block">
          <DeerParticles />
        </div>
      </div>
      {isTokenExpired && <TokenExpired />}
    </>
  );
}
