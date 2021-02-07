import React from "react";
import { Card, Container, Table } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import DeerParticles from "../layout/DeerParticles";

export default function User() {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="container justify-content-center" align="center">
        <DeerParticles />
        <Container className="d-flex align-items-center justify-content-center">
          <Card>
            <Card.Title className="m-3">My Account</Card.Title>
            <Card.Body>
              <Table hover>
                <tbody>
                  <tr>
                    <td>Email</td>
                    <td colSpan="3">{currentUser.email}</td>
                    <td>
                      <Link to="/update-user" className="btn btn-sm btn-dark">
                        Edit
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
