import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header(props) {
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-info mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Stock Info
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/predict" className="nav-link">
                Predict
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Header.defaultProps = {
  branding: "My App",
};

Header.propTypes = {
  branding: PropTypes.string.isRequired,
};
