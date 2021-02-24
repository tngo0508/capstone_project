import React from "react";
import Particles from "react-particles-js";
// import { Editor } from "@tinymce/tinymce-react";
// import { MDBView, MDBMask, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
// import RelatedNewsImg from "../../img/related_news.jpg";
import ProjectImg from "../../img/projects.gif";
import RelatedNewsImg from "../../img/related_news.gif";
import PorfolioImg from "../../img/porfolio.gif";
import TradingMonitorImg from "../../img/trading_monitor.gif";
import LookupImg from "../../img/lookup.gif";
import BrainImg from "../../img/brain.gif";
import ExpertImg from "../../img/expert.gif";
import WhyImg from "../../img/why_img.gif";
import ParticlesBg from "particles-bg";

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
              <h1>Brand Value Analysis</h1>
              <h5>
                Our mission is to provide the{" "}
                <strong className="text-warning">best</strong> and{" "}
                <strong className="text-warning">free service</strong> about
                stock market exchange to anyone at anywhere
              </h5>
            </div>
          </div>
        </div>
      </div>

      <section id="about-my-project">
        <MDBContainer className="mb-5">
          <MDBRow className="about">
            <MDBCol md="6" className="mb-3 text-center">
              <img
                src={ProjectImg}
                alt="project"
                className="img-fluid z-depth-1 rounded-circle d-none d-md-block about-img"
              />
            </MDBCol>
            <MDBCol md="6">
              <h1 className="display-5 p-5">About My Project</h1>
              <p>
                Welcome to BVA, my name is <strong>Thomas Ngo</strong> and this
                is my capstone project for master's degree at CSUF <br />
                The purpose of this application is to provide investors key
                insights and estimate value of the brands for investment
                decisions. It keeps track of pricing data for competitive
                advantages and helps businesses develop their investment
                strategies.
              </p>
              <p>
                This web application is useful for investors because it can
                evaluate mindshare to predict sales weeks in advance. It can
                also gauge fluctuations in market share relative to a company’s
                competitors by going through historical data integration and
                real-time monitoring. Besides, it can identify critical
                influences and successful tactics by collecting financial
                metrics data and comparing it to the competition. This
                application helps investors and economic analysts gain a better
                understanding of the monetary value of their investing brand or
                company.
              </p>
              <p className="text-secondary mb-5">Version 1.0.0</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <section id="why-this-app" className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
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
                  software engineer, and software testing. Besides, this project
                  is significant for me as a graduate student since it allows me
                  to apply web scraping techniques, machine learning, server
                  administration, etc. in real-world applications. With that
                  said, this project gives me the opportunity to practice
                  software engineering principles to become a more pragmatic and
                  better programmer or software engineer.
                </p>
              </div>
            </div>
            <MDBCol md="6" className="mb-3 text-center">
              <img
                src={WhyImg}
                alt="project"
                className="img-fluid z-depth-1 rounded-circle d-none d-md-block project-img"
              />
            </MDBCol>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <i className="fas fa-expand fa-7x mb-3 d-none d-md-block"></i>
              <h2 className="d-none d-md-block">Scalable</h2>
            </div>
            <div className="col-md-4">
              <i className="fas fa-thumbs-up fa-7x mb-3 d-none d-md-block"></i>
              <h2 className="d-none d-md-block">Applicable</h2>
            </div>
            <div className="col-md-4">
              <i className="fas fa-check-circle fa-7x mb-2 d-none d-md-block"></i>
              <h2 className="d-none d-md-block">Feasible</h2>
            </div>
          </div>
        </div>
      </section>

      <section id="features-in-this-app" className="pt-5 text-center">
        <div className="container">
          <div className="row">
            <div className="features-available mb-5">
              <h1 className="text-dark pb-3">What Features Are Available?</h1>
              <p className="lead pb-3">
                Currently, you can utilize one of the following features. In the
                future, more advance features will be implemented. Don't forget
                to subscribe to receive our latest newsletter about the new
                features!
              </p>
            </div>
          </div>
          <div className="row text-center">
            <div className="col"></div>
          </div>
        </div>
      </section>

      <section id="icon-cards" className="p-5">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col p-3">
                <div className="card">
                  <img
                    src={LookupImg}
                    className="card-img-top"
                    alt="stock_ticker"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Stock Ticker Symbol Lookup</h5>
                    <p className="card-text">
                      This feature allows the user to search for a specific
                      company based on Stock Ticker Symbol. The user is able to
                      obtain different stock metrics to inform about that
                      company.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col p-3">
                <div className="card">
                  <img
                    src={RelatedNewsImg}
                    className="card-img-top"
                    alt="related_news"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Related News Generator</h5>
                    <p className="card-text">
                      This comes along with the Symbol Lookup. The user can get
                      the most up-to-date news related to the Stock Symbol.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col p-3">
                <div className="card">
                  <img
                    src={TradingMonitorImg}
                    className="card-img-top"
                    alt="TradingMonitorImg"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Daily Trading Monitoring</h5>
                    <p className="card-text">
                      A zoomable timeseries chart will be generated based on the
                      Stock Symbol. This chart monitors the stock price movement
                      or daily time series (date, daily open, daily high, daily
                      low, daily close, daily volume) of the global equity
                      specified, covering 20+ years of historical data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col p-3">
                <div className="card">
                  <img
                    src={PorfolioImg}
                    className="card-img-top"
                    alt="PorfolioImg"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Porfolio Creator</h5>
                    <p className="card-text">
                      The users can create their own porfolio and manage their
                      investment. This feature helps users to plan and execute
                      their investment strategies better.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col p-3">
                <div className="card">
                  <img src={BrainImg} className="card-img-top" alt="BrainImg" />
                  <div className="card-body">
                    <h5 className="card-title">Brand Value Estimator</h5>
                    <p className="card-text">
                      The website runs machine learning algorithms behind the
                      scene which calculate the risk and provide the users the
                      elvalutation of the company specified.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col p-3">
                <div className="card">
                  <img src={ExpertImg} className="card-img-top" alt="..." />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="container"
        style={{
          height: "100%",
          width: "100%",
          paddingTop: "10rem",
          paddingBottom: "10rem",
        }}
      >
        {/* <h1 className="display-4">ABout My App</h1>
        <p className="lead">
          Welcome to BVA, this is my capstone project for master's degree at
          CSUF <br />
          The purpose of this application is to provide investors key insights
          and estimate value of the brands for investment decisions. It keeps
          track of pricing data for competitive advantages and helps businesses
          develop their investment strategies.
        </p> */}
        {/* <form>
          <h2>Get Feedback</h2>
          <Editor
            apiKey="jlmgdmuom8f3vxnots0qgipbgupc4jdgbfjud7ysr0vbtilm"
            initialValue="<p>Welcome to BVA</p>"
            init={{
              height: 300,
              menubar: true,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help",
            }}
            onChange={onChange}
          />
        </form> */}
        {/* <p className="text-secondary">Version 1.0.0</p> */}
        <Particles
          params={{
            particles: {
              color: {
                value: "#000",
              },
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
              line_linked: {
                color: {
                  value: "#000",
                },
              },
              size: {
                value: 4,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "grab",
                },
              },
              onclick: {
                enable: true,
                mode: "push",
              },
            },
          }}
        />
      </div>
    </>
  );
}
