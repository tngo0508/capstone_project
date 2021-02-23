import React from "react";
import Particles from "react-particles-js";
// import { Editor } from "@tinymce/tinymce-react";
// import { MDBView, MDBMask, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";

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
                Our mission is to provide the best and free service about stock
                market exchange to anyone at anywhere
              </h5>
            </div>
          </div>
        </div>
      </div>

      <section>
        <MDBContainer>
          <MDBRow className="about">
            <MDBCol md="6">
              <h1 className="p-5">About My App</h1>
              <p className="lead">
                Welcome to BVA, this is my capstone project for master's degree
                at CSUF <br />
                The purpose of this application is to provide investors key
                insights and estimate value of the brands for investment
                decisions. It keeps track of pricing data for competitive
                advantages and helps businesses develop their investment
                strategies.
              </p>
              <p className="text-secondary">Version 1.0.0</p>
            </MDBCol>
            <MDBCol md="6" className="mb-3 text-center">
              <img
                src="https://source.unsplash.com/random/700x700?Coding"
                alt=""
                className="img-fluid z-depth-1 rounded-circle d-none d-md-block about-img"
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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
                  mode: "repulse",
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
