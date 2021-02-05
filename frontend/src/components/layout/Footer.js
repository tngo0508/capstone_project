import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";
import DeerParticles from "./DeerParticles";

class Footer extends Component {
  render() {
    return (
      <>
        <MDBFooter color="stylish-color" className="font-small pt-4 mt-4">
          <MDBContainer>
            <MDBContainer fluid className="text-center text-md-left m-3">
              <MDBRow>
                <MDBCol md="4">
                  <h5 className="title">Invest In Your Future Now</h5>
                  <p>
                    Our mission is your success. We work every day to help you
                    stay wealthy. This is the place where customers can find and
                    discover their trusted company to reach higher financial
                    attitude.
                  </p>
                  <p className="font-weight-bold text-uppercase my-3">
                    Stay connected
                  </p>
                  <i className="fab fa-twitter fa-2x"></i>
                  <i className="fab fa-facebook fa-2x mx-3"></i>
                  <i className="fab fa-linkedin-in fa-2x mx-3"></i>
                  <i className="fab fa-youtube fa-2x mx-3"></i>
                </MDBCol>
                <MDBCol md="4" className="text-md-right">
                  <h5 className="title">Quick Links</h5>
                  <ul>
                    <li className="list-unstyled">
                      <Link to="/">Home Page</Link>
                    </li>
                    <li className="list-unstyled">
                      <Link to="/signup">Sign Up</Link>
                    </li>
                    <li className="list-unstyled">
                      <Link to="/login">Log In</Link>
                    </li>
                  </ul>
                </MDBCol>
                <MDBCol md="4" className="text-md-right">
                  <h5 className="title">Useful Links</h5>
                  <ul>
                    <li className="list-unstyled">
                      <Link to="/term">Terms of Use</Link>
                    </li>
                    <li className="list-unstyled">
                      <Link to="/privacy">Privacy Policy</Link>
                    </li>
                  </ul>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()}
              <Link to="/"> BrandValueAnalysis </Link>
            </MDBContainer>
          </div>
        </MDBFooter>
      </>
    );
  }
}

export default Footer;
