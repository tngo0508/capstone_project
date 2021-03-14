import React from "react";
import { Link } from "react-router-dom";
import { MDBAnimation } from "mdbreact";
import img from "../../img/shotsnapp.png";

export default function HomePage() {
  return (
    <>
      <section id="home-section">
        <div className="dark-overlay">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 d-lg-block">
                <MDBAnimation reveal type="fadeInLeft" delay=".3s">
                  <h1 className="display-5" style={{ paddingTop: "150px" }}>
                    Develop <strong>investment strategies</strong> and make{" "}
                    <strong>profitable earnings</strong>
                  </h1>
                  <div className="d-flex">
                    <div className="p-4 align-self-start">
                      <i className="fas fa-comment-dollar fa-2x"></i>
                    </div>
                    <div className="p-4 align-self end">
                      <p className="font-weight-bold">
                        Think forward, move forward
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="p-4 align-self-start">
                      <i className="fas fa-comment-dollar fa-2x"></i>
                    </div>
                    <div className="p-4 align-self end">
                      <p className="font-weight-bold">
                        The best way to build a higher net worth
                      </p>
                    </div>
                  </div>
                  <div className="d-flex d-none">
                    <div className="p-4 align-self-start">
                      <i className="fas fa-comment-dollar fa-2x"></i>
                    </div>
                    <div className="p-4 align-self end">
                      <p className="font-weight-bold">
                        Invest time and energy with us to create the best
                        interest
                      </p>
                    </div>
                  </div>
                </MDBAnimation>
              </div>

              <div className="col-lg-4" style={{ paddingTop: "150px" }}>
                <MDBAnimation reveal type="fadeInRight" delay=".3s">
                  <img
                    src="https://source.unsplash.com/random/700x700?stockmarket"
                    alt=""
                    className="img-fluid rounded-circle d-sm-block d-none"
                  />
                </MDBAnimation>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="home-icons" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 text-center">
              <MDBAnimation reveal type="bounceIn" delay="1s">
                <i className="fas fa-balance-scale-left fa-3x mb-2"></i>
                <h3>Evaluating Company</h3>
                <p>
                  We provide friendly service that allow you to estimate your
                  interested company using the state-of-the-art machine
                  learnning algorithms
                </p>
              </MDBAnimation>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <MDBAnimation reveal type="bounceIn" delay="1.3s">
                <i className="fas fa-newspaper fa-3x mb-2"></i>
                <h3>Reading News</h3>
                <p>
                  We bring the related news from various sources to keep you
                  up-to-date to the current situation of the market exchange
                </p>
              </MDBAnimation>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <MDBAnimation reveal type="bounceIn" delay="1.6s">
                <i className="fas fa-folder-open fa-3x mb-2"></i>
                <h3>Creating Porfolio</h3>
                <p>
                  You can create your porfolio and diversify your stock before
                  making any investments
                </p>
              </MDBAnimation>
            </div>
            <div className="col-md-4 mb-4 text-center"></div>
            <div className="col-md-4 mb-4 text-center"></div>
          </div>
        </div>
      </section>
      <section id="home-heading" className="p-5">
        <MDBAnimation reveal type="fadeIn">
          <div className="dark-overlay">
            <div className="row">
              <div className="col">
                <div className="container pt-5">
                  <h1>Are You Ready To Learn About Your Stock?</h1>
                  <p className="d-none d-md-block">
                    Don't waste time anymore. Get started here with us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MDBAnimation>
      </section>
      <section id="info" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <MDBAnimation reveal type="fadeInUp">
                <h1>Sign Up Today</h1>
                <p>
                  Everything is free. What are you waiting for? Join us to learn
                  more about your investment. We give you the clarity and
                  confidence to build your dreams, on your terms. Don't leave
                  without becoming an BVA member!
                </p>
                <Link to="/signup" className="btn btn-dark btn-lg">
                  Get Started
                </Link>
              </MDBAnimation>
            </div>
            <div className="col-md-6">
              <MDBAnimation reveal type="fadeInDown">
                <img src={img} alt="snapshot" className="img-fluid" />
              </MDBAnimation>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
