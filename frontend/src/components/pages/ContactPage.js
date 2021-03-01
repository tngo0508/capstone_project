import React, { useState, useEffect } from "react";
import ParticlesBg from "particles-bg";
import TextInputGroup from "../layout/TextInputGroup";
import emailjs from "emailjs-com";
import { Editor } from "@tinymce/tinymce-react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSentError, setIsSentError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentError, setSentError] = useState("");

  const onChange = (content, editor) => {
    // console.log("Content was updated:", content);
    setMessage(content);
  };

  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangeSubject = (e) => setSubject(e.target.value);

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log("This will run after 1 second!");
      // clear the alert message
      setIsSent(false);
      setIsSentError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSent]);

  // console.log(errors);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    if (name === "") {
      setErrors({ name: "Name field is required." });
      setLoading(false);
      return;
    }

    if (email === "") {
      setErrors({ email: "Email field is required." });
      setLoading(false);
      return;
    }

    if (subject === "") {
      setErrors({ subject: "Subject field is required." });
      setLoading(false);
      return;
    }

    if (message === "") {
      setErrors({ message: "Message field is required." });
      setLoading(false);
      return;
    }

    // using emailjs to send mail
    const templateParams = {
      from_name: name,
      message,
      subject,
      email,
      to_name: "Thomas",
      replay_to: email,
    };

    // console.log(templateParams);

    emailjs
      .send(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
        process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAIL_JS_USER_ID
      )
      .then(
        (result) => {
          // console.log(result.text);
          setIsSent(true);
          setIsSentError(false);
        },
        (error) => {
          // console.log(error.text);
          setIsSent(false);
          setSentError(error.text);
          setIsSentError(true);
        }
      );

    // clear state after submitting form
    e.target.reset();
    setEmail("");
    setErrors("");
    setName("");
    setMessage("");
    setSubject("");
    setLoading(false);
  };
  return (
    <div>
      <ParticlesBg type="circle" bg={true} />
      <section id="mission" className="py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-3">
              <div className="contact-header mb-5">
                <div className="card bg-secondary text-white">
                  <div className="card-body">
                    <h3 className="pb-3">Our Vision</h3>
                    <p>
                      BVA will one of the most distinguished platform in the
                      United States and beyond. We focus on providing users the
                      best financial management strategies and insights about
                      stock market exchange. In other words, our aim is to help
                      businesses develop their investment strategies and launch
                      a better plan for their future success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-9">
              <div className="card">
                <div className="card-body bg-primary text-white">
                  <h3 className="pb-3">Our Mission</h3>
                  <p className="mb-3">
                    <i className="fas fa-check p-2"></i> Help you reach higher
                    financial attitude
                  </p>
                  <p className="mb-3">
                    <i className="fas fa-check p-2"></i> Bring creative features
                    to plan your strategy
                  </p>
                  <p className="mb-3">
                    <i className="fas fa-check p-2"></i> Reinvent your finance
                    for the better
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form py-5">
        <div className="container">
          <div className="card">
            <div className="row no-gutter">
              <div className="col-md-7 bg-light">
                <div className="card-body">
                  <h5 className="card-title">SEND US A MESSAGE</h5>
                  <form onSubmit={sendEmail}>
                    <TextInputGroup
                      label="Name"
                      name="name"
                      placeholder="Enter your name"
                      type="text"
                      value={name}
                      onChange={onChangeName}
                      error={errors.name}
                      maxLength="256"
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      placeholder="Enter your email address"
                      type="text"
                      value={email}
                      onChange={onChangeEmail}
                      error={errors.email}
                      maxLength="256"
                    />
                    <TextInputGroup
                      label="Subject"
                      name="subject"
                      placeholder="Enter your Subject"
                      type="text"
                      value={subject}
                      onChange={onChangeSubject}
                      error={errors.subject}
                      maxLength="256"
                    />
                    <Editor
                      apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                      initialValue="<p>Enter your message here</p>"
                      init={{
                        selector: "textarea#valid-elements",
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
                      value={errors.message}
                      onEditorChange={onChange}
                    />
                    <br />
                    <div className="text-right">
                      <button
                        disabled={loading}
                        type="submit"
                        className="btn btn-circle p-3 my-3"
                      >
                        <i className="fas fa-paper-plane fa-3x"></i>
                      </button>
                    </div>
                  </form>
                  {isSent && (
                    <div className="alert alert-success" role="alert">
                      Thank you! Your message has been sent!
                    </div>
                  )}
                  {isSentError && (
                    <div className="alert alert-danger" role="alert">
                      Sorry. Your message is not sent. Error: {sentError}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-5 text-white bg-dark">
                <div className="card-body p-5">
                  <div className="card-title mb-5">
                    <h5>CONTACT INFORMATION</h5>
                  </div>
                  <p className="card-text text-white">
                    <i className="fas fa-map-marker-alt p-2"></i>8290 PALAIS RD,
                    STANTON, CA 90680
                  </p>
                  <p className="card-text text-white">
                    <i className="fas fa-phone-alt p-2"></i>+1 (714) 683-4907
                  </p>
                  <p className="card-text text-white">
                    <i className="fas fa-envelope p-2"></i>tngo0508@gmail.com
                  </p>

                  <div className="d-flex justify-content-around">
                    <div className="p-4">
                      <a href="https://www.linkedin.com/in/thomas-ngo-4a6984138/">
                        <i className="fa fa-linkedin fa-3x"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="https://github.com/tngo0508">
                        <i className="fa fa-github fa-3x"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a href="mailto:tngo0508@gmail.com">
                        <i className="fas fa-envelope fa-3x"></i>
                      </a>
                    </div>
                  </div>
                  <h5 className="pb-5">Visit us at the following address</h5>
                  <iframe
                    title="google-map"
                    width="100%"
                    height="400"
                    loading="lazy"
                    allowFullScreen
                    src={
                      "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJr53QoxAp3YARICsoJw3Hdz4&key=" +
                      process.env.REACT_APP_GOOGLE_MAP_API_KEY
                    }
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
