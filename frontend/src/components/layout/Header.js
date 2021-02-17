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
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import favicon from "../../img/favicon-32x32.png";
// import { auth } from "../auth/firebase";

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

  // useEffect(() => {
  //   // console.log("header");
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // console.log(user);
  //       console.log("user sign in");
  //     } else {
  //       console.log("no user is signed in");
  //     }
  //   });

  //   // if (newUser != currentUser) {
  //   //   console.log(currentUser);
  //   //   console.log(newUser);
  //   //   onLogoutClick();
  //   // }
  //   return unsubscribe;
  // });

  return (
    <MDBNavbar color="unique-color-dark" dark expand="md">
      <img src={favicon} alt="icon" />
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
          {currentUser ? (
            <>
              <MDBNavItem>
                <MDBNavLink to="/findstock">
                  <MDBIcon icon="search-dollar" /> Stock
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/predict">
                  <MDBIcon icon="dollar-sign" /> Evaluation
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/reports">
                  <MDBIcon icon="lightbulb" /> Insight
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/sectors">
                  <MDBIcon icon="chart-line" /> Performance
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/porfolio">
                  <MDBIcon icon="folder-open" /> Porfolio
                </MDBNavLink>
              </MDBNavItem>
            </>
          ) : (
            <>
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
            </>
          )}
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
                    <MDBNavLink className="black-text" to="/user">
                      <strong>My Account</strong>
                    </MDBNavLink>
                  </MDBDropdownItem>
                  {/* <MDBDropdownItem>
                    <MDBNavLink className="black-text" to="/">
                      <strong>Find Stock</strong>
                    </MDBNavLink>
                  </MDBDropdownItem> */}
                  <MDBDropdownItem divider />
                  <MDBDropdownItem>
                    <MDBNavLink
                      onClick={onLogoutClick}
                      className="black-text"
                      to="#"
                    >
                      <strong>Log Out</strong> <MDBIcon icon="sign-out-alt" />
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
