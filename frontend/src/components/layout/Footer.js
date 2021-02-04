import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
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
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime, ab quidem. Architecto suscipit doloribus quod
                    aperiam, quisquam excepturi voluptate saepe. Laudantium, ex
                    minus. Non omnis minus consequatur blanditiis iste
                    recusandae.
                  </p>
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
