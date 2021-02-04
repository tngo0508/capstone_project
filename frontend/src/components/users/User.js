import React, { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import DeerParticles from "../layout/DeerParticles";

export default function User() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  return (
    <>
      <div className="container justify-content-center" align="center">
        <DeerParticles />
      </div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">My Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <Link to="/update-user" className="btn btn-primary w-100">
            Edit
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
