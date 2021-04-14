import React from "react";
// import Particles from "react-particles-js";
// import { Editor } from "@tinymce/tinymce-react";
// import { MDBView, MDBMask, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
import ProjectImg from "../../img/projects.gif";
import RelatedNewsImg from "../../img/related_news.gif";
import PortfolioImg from "../../img/portfolio.gif";
import TradingMonitorImg from "../../img/trading_monitor.gif";
import LookupImg from "../../img/lookup.gif";
import BrainImg from "../../img/brain.gif";
import ExpertImg from "../../img/expert.gif";
import WhyImg from "../../img/why_img.gif";
import ProfileImg from "../../img/profile.png";
import { MDBAnimation } from "mdbreact";
// import ParticlesBg from "particles-bg";

export default function About() {
  // const onChange = (e) => {
  //   console.log("Content was updated:", e.target.getContent());
  // };

  return (
    <>
      <div id="about-page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <MDBAnimation reveal type="pulse">
                <h1>Brand Value Analysis</h1>
                <h5>
                  Our mission is to provide the{" "}
                  <strong className="text-warning">best</strong> and{" "}
                  <strong className="text-warning">free service</strong> about
                  stock market exchange to anyone at anywhere
                </h5>
              </MDBAnimation>
            </div>
          </div>
        </div>
      </div>

      <section id="about-my-project">
        <MDBContainer className="mb-5">
          <MDBRow className="about">
            <MDBCol md="6" className="mb-3 text-center">
              <MDBAnimation reveal type="slideInLeft">
                <img
                  src={ProjectImg}
                  alt="project"
                  className="img-fluid z-depth-1 rounded-circle d-none d-md-block about-img"
                />
              </MDBAnimation>
            </MDBCol>
            <MDBCol md="6">
              <MDBAnimation reveal type="slideInRight">
                <h1 className="display-5 p-5">About My Project</h1>
                <p>
                  Welcome to BVA, my name is <strong>Thomas Ngo</strong> and
                  this is my capstone project for master's degree at CSUF <br />
                  The purpose of this application is to provide investors key
                  insights and estimate value of the brands for investment
                  decisions. It keeps track of pricing data for competitive
                  advantages and helps businesses develop their investment
                  strategies.
                </p>
                <p>
                  This web application is useful for investors because it can
                  evaluate mindshare to predict sales weeks in advance. It can
                  also gauge fluctuations in market share relative to a
                  company’s competitors by going through historical data
                  integration and real-time monitoring. Besides, it can identify
                  critical influences and successful tactics by collecting
                  financial metrics data and comparing it to the competition.
                  This application helps investors and economic analysts gain a
                  better understanding of the monetary value of their investing
                  brand or company.
                </p>
                <p className="text-secondary mb-5">Version 1.0.0</p>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <section id="why-this-app" className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <MDBAnimation reveal type="flipInY">
                <div className="info-header mb-5">
                  <h1 className="text-center pb-3">
                    Why Did I Create This Capstone Project?
                  </h1>
                  <p className="text-dark lead">
                    Because it is{" "}
                    <strong>scalable, applicable, and feasible</strong> to
                    complete within a semester. It is an aggregation of various
                    computer science courses such as web frontend and backend
                    engineering, data mining, database, software architecture,
                    software engineer, and software testing. Besides, this
                    project is significant for me as a graduate student since it
                    allows me to apply web scraping techniques, machine
                    learning, server administration, etc. in real-world
                    applications. With that said, this project gives me the
                    opportunity to practice software engineering principles to
                    become a more pragmatic and better programmer or software
                    engineer.
                  </p>
                </div>
              </MDBAnimation>
            </div>
            <MDBCol md="6" className="mb-3 text-center">
              <MDBAnimation reveal type="flipInX">
                <img
                  src={WhyImg}
                  alt="project"
                  className="img-fluid z-depth-1 rounded-circle d-none d-md-block project-img"
                />
              </MDBAnimation>
            </MDBCol>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <MDBAnimation reveal type="zoomIn">
                <i className="fas fa-expand fa-7x mb-3 d-none d-md-block"></i>
                <h2 className="d-none d-md-block">Scalable</h2>
              </MDBAnimation>
            </div>
            <div className="col-md-4">
              <MDBAnimation reveal type="zoomIn" delay="0.5s">
                <i className="fas fa-thumbs-up fa-7x mb-3 d-none d-md-block"></i>
                <h2 className="d-none d-md-block">Applicable</h2>
              </MDBAnimation>
            </div>
            <div className="col-md-4">
              <MDBAnimation reveal type="zoomIn" delay="1s">
                <i className="fas fa-check-circle fa-7x mb-2 d-none d-md-block"></i>
                <h2 className="d-none d-md-block">Feasible</h2>
              </MDBAnimation>
            </div>
          </div>
        </div>
      </section>

      <section id="features-in-this-app" className="pt-5 text-center">
        <div className="container">
          <div className="row">
            <div className="features-available mb-5">
              <MDBAnimation reveal type="rotateInDownLeft" delay="1s">
                <h1 className="text-dark pb-3">What Features Are Available?</h1>
                <p className="lead pb-3">
                  Currently, you can utilize one of the following features. In
                  the future, more advance features will be implemented. Don't
                  forget to subscribe to receive our latest newsletter about the
                  new features!
                </p>
              </MDBAnimation>
            </div>
          </div>
        </div>
      </section>

      <section id="icon-cards" className="p-5">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col p-3">
                <MDBAnimation reveal type="zoomIn">
                  <div className="card">
                    <img
                      src={LookupImg}
                      className="card-img-top"
                      alt="LookupImg"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Stock Ticker Symbol Lookup</h5>
                      <p className="card-text">
                        This feature allows the user to search for a specific
                        company based on Stock Ticker Symbol. The user is able
                        to obtain different stock metrics to inform about that
                        company.
                      </p>
                    </div>
                  </div>
                </MDBAnimation>
              </div>
              <div className="col p-3">
                <div className="card">
                  <MDBAnimation reveal type="zoomIn">
                    <img
                      src={RelatedNewsImg}
                      className="card-img-top"
                      alt="RelatedNewsImg"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Related News Generator</h5>
                      <p className="card-text">
                        This comes along with the Symbol Lookup. The user can
                        get the most up-to-date news related to the Stock
                        Symbol.
                      </p>
                    </div>
                  </MDBAnimation>
                </div>
              </div>
              <div className="col p-3">
                <div className="card">
                  <MDBAnimation reveal type="zoomIn">
                    <img
                      src={TradingMonitorImg}
                      className="card-img-top"
                      alt="TradingMonitorImg"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Daily Trading Monitoring</h5>
                      <p className="card-text">
                        A zoomable timeseries chart will be generated based on
                        the Stock Symbol. This chart monitors the stock price
                        movement or daily time series (date, daily open, daily
                        high, daily low, daily close, daily volume) of the
                        global equity specified, covering 20+ years of
                        historical data.
                      </p>
                    </div>
                  </MDBAnimation>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col p-3">
                <div className="card">
                  <MDBAnimation reveal type="zoomIn">
                    <img
                      src={PortfolioImg}
                      className="card-img-top"
                      alt="PortfolioImg"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Portfolio Creator</h5>
                      <p className="card-text">
                        The users can create their own porfolio and manage their
                        investment. This feature helps users to plan and execute
                        their investment strategies better.
                      </p>
                    </div>
                  </MDBAnimation>
                </div>
              </div>
              <div className="col p-3">
                <div className="card">
                  <MDBAnimation reveal type="zoomIn">
                    <img
                      src={BrainImg}
                      className="card-img-top"
                      alt="BrainImg"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Brand Value Estimator</h5>
                      <p className="card-text">
                        The website runs machine learning algorithms behind the
                        scene which calculate the risk and provide the users the
                        elvalutation of the company specified.
                      </p>
                    </div>
                  </MDBAnimation>
                </div>
              </div>
              <div className="col p-3">
                <div className="card">
                  <MDBAnimation reveal type="zoomIn">
                    <img
                      src={ExpertImg}
                      className="card-img-top"
                      alt="ExpertImg"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        Report and Performance Review
                      </h5>
                      <p className="card-text">
                        This feature allows user to read the report and
                        performance review from researchers and experts about a
                        specific company. They can also check the sector
                        performance on 1 day, 1 month, 1 Year, 5 Years and 10
                        Years.
                      </p>
                    </div>
                  </MDBAnimation>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="text-center p-5 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col">
              <MDBAnimation reveal type="zoomIn">
                <h1>Sign Up For Our Newsletter</h1>
                <p>
                  Join our mailing list to receive the email updates on our
                  newest features, announcements and more. You'll be the first
                  to know!
                </p>
                <form
                  className="form-inline justify-content-center"
                  action={process.env.REACT_APP_MAILCHIMP_URL}
                  method="post"
                >
                  <input
                    type="text"
                    className="form-control mb-2 mr-2"
                    placeholder="Enter Email"
                    name="EMAIL"
                  />
                  <button type="submit" className="btn btn-danger mb-2">
                    Subscribe
                  </button>
                </form>
              </MDBAnimation>
            </div>
          </div>
        </div>
      </section>

      <section id="creator" className="py-5 bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col">
              <MDBAnimation reveal type="fadeInDown">
                <div className="creator-header mb-5">
                  <h1 className="text-dark pb-3">About The Creator</h1>
                  <p>
                    A graduate student who is pursuing the master's degree in
                    Computer Sciece at California State University, Fullerton
                    (CSUF). His passions are coding and learning new
                    technologies.
                  </p>
                </div>
              </MDBAnimation>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <MDBAnimation reveal type="fadeInUp">
                <div className="card">
                  <div className="card-body">
                    <img
                      src={ProfileImg}
                      alt="ProfileImg"
                      className="img-fluid rounded-circle mb-3"
                    />
                    <h3>Thomas Ngo</h3>
                    <h5 className="text-muted">Creator</h5>
                    <p>
                      Hi there, thank you for visting my website. I hope you
                      will find what you need on this site. The best way to
                      contact me is via email or the following links.
                    </p>
                    <div className="d-flex justify-content-center">
                      <div className="p-4">
                        <a href="https://www.linkedin.com/in/thomas-ngo-4a6984138/">
                          <i className="fa fa-linkedin-square fa-3x"></i>
                        </a>
                      </div>
                      <div className="p-4">
                        <a href="https://github.com/tngo0508">
                          <i className="fa fa-github-square fa-3x"></i>
                        </a>
                      </div>
                      <div className="p-4">
                        <a href="mailto:tngo0508@gmail.com">
                          <i className="fas fa-envelope-square fa-3x"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBAnimation>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
