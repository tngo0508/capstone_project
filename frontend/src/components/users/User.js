import React from "react";
import { Card, Container, Table } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import DeerParticles from "../layout/DeerParticles";

export default function User() {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="container justify-content-center mb-5" align="center">
        <div className="d-none d-md-block">
          <DeerParticles />
        </div>
        <Container className="d-flex align-items-center justify-content-center mt-5">
          <Card>
            <Card.Title className="m-3">My Account</Card.Title>
            <Card.Body>
              <Table hover>
                <tbody>
                  <tr>
                    {/* <td>Email</td> */}
                    <td colSpan="3">
                      <i className="fas fa-envelope p-1"></i>
                      {currentUser.email}
                    </td>
                    <td>
                      <Link to="/update-user" className="btn btn-sm btn-dark">
                        <i className="fas fa-edit fa-sm"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    {/* <td>Password</td> */}
                    <td colSpan="3">
                      <i className="fas fa-key p-1"></i>**************
                    </td>
                    <td>
                      <Link
                        to="/update-password"
                        className="btn btn-sm btn-dark"
                      >
                        <i className="fas fa-edit fa-sm"></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
