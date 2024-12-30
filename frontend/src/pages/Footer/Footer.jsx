import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX, BsFacebook } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className="bg-light text-light"
    >
      <div style={{ flex: 1 }}></div>

      {/* Footer */}
      <div className="container-fluid">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-4 border-top text-light">
          {/* Brand Section */}
          <div className="col mb-3">
            <a
              href="/"
              className="d-flex align-items-center mb-3 text-light text-decoration-none"
            >
              <svg className="bi me-2" width="40" height="32">
                <use xlinkHref="#bootstrap"></use>
              </svg>
              <span className="fs-4">TakeCart</span>
            </a>
            <p>© 2024 TakeCart, Inc</p>
          </div>

          <div className="col mb-3"></div>

          {/* Link Sections */}
          <div className="col mb-3">
            <h5 className="text-success">Explore</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a
                  href="/"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="/product"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  Products
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="/history"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  History
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="/"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="/"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <h5 className="text-success">Support</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a
                  href="/faq"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="/contact"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  Contact Us
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="/terms"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  Terms of Service
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="/privacy"
                  className="nav-link p-0 text-light hover-text-success"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col mb-3">
            <h5 className="text-success">Follow Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover-text-success d-flex align-items-center"
                >
                  <BsTwitterX size={20} className="me-2" /> Twitter
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover-text-success d-flex align-items-center"
                >
                  <AiFillInstagram size={20} className="me-2" /> Instagram
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover-text-success d-flex align-items-center"
                >
                  <BsFacebook size={20} className="me-2" /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
