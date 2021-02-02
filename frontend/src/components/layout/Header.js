import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function Header(props) {
  const { branding } = props;
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  function onClick(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  async function onLogoutClick() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <MDBNavbar color="unique-color-dark" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">{branding}</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={onClick} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/">
              <MDBIcon icon="home" /> Home
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/Signup">
              <MDBIcon icon="user-plus" /> Sign Up
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/login">
              <MDBIcon icon="sign-in-alt" /> Log In
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/about">
              <MDBIcon icon="question" /> About
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        {currentUser ? (
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className="mr-1" /> {currentUser.email}
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem>
                    <MDBNavLink className="black-text" to="/profile">
                      <strong>Profile</strong>
                    </MDBNavLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBNavLink className="black-text" to="/">
                      <strong>Find Stock</strong>
                    </MDBNavLink>
                  </MDBDropdownItem>
                  <hr />
                  <MDBDropdownItem>
                    <MDBNavLink className="black-text" to="#">
                      <strong onClick={onLogoutClick}>Log Out</strong>{" "}
                      <MDBIcon icon="sign-out-alt" />
                    </MDBNavLink>
                    {error && <Alert variant="danger">{error}</Alert>}
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        ) : null}
      </MDBCollapse>
    </MDBNavbar>
  );
}

Header.defaultProps = {
  branding: "My App",
};

Header.propTypes = {
  branding: PropTypes.string.isRequired,
};
