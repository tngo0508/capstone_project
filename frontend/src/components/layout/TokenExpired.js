import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import { useHistory } from "react-router-dom";

function TokenExpired() {
  const { logout } = useAuth();
  const history = useHistory();
  const toggle = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to log out");
    }
  };

  return (
    <>
      <MDBContainer>
        <MDBModal centered disableFocusTrap={false} isOpen={true}>
          <MDBModalHeader>Session Expired</MDBModalHeader>
          <MDBModalBody>
            Your token has expired. Please login again.
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>
              Log In
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    </>
  );
}

export default TokenExpired;
