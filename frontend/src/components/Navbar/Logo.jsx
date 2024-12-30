import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const LogoComponent = () => (
  <Navbar.Brand as={Link} to="/" className="me-3">
    <img
      src={Logo}
      alt="logo"
      className="navbar-brand-img"
      style={{ maxWidth: "150px", height: "auto" }}
    />
  </Navbar.Brand>
);

export default LogoComponent;
