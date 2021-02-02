import React, { Component } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBFooter,
  MDBTypography,
  MDBBox,
} from "mdbreact";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <>
        <MDBFooter color="stylish-color" className="font-small pt-4 mt-4">
          <MDBContainer>
            <MDBContainer fluid className="text-center text-md-left">
              <MDBRow>
                <MDBCol md="6">
                  <h5 className="title">Invest In Your Future Now</h5>
                  <MDBTypography blockquote>
                    <MDBBox color="white" tag="p" mb={0}>
                      An investment in knowledge pays the best interest.
                    </MDBBox>
                    <MDBBox
                      color="white"
                      tag="footer"
                      mb={3}
                      className="blockquote-footer"
                    >
                      Benjamin Franklin{" "}
                      <cite title="Title">The Way to Wealth</cite>
                    </MDBBox>
                  </MDBTypography>
                </MDBCol>
                <MDBCol md="6" className="text-md-right">
                  <h5 className="title">Quick Links</h5>
                  <ul>
                    <li className="list-unstyled">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="list-unstyled">
                      <Link to="/signup">Sign Up</Link>
                    </li>
                    <li className="list-unstyled">
                      <Link to="/login">Log In</Link>
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
