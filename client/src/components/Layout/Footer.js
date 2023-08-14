import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-light p-3 footer">
      <h4 className="text-center">All Right Reserved &copy; Ecommerce</h4>
      <p className="text-center mt-4">
        <Link
          to={"/contact"}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Contact
        </Link>{" "}
        |{" "}
        <Link
          to={"/policy"}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link
          to={"/about"}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          About
        </Link>
      </p>
      <p className="text-center mt-4">
        <Link
          to={"/developer"}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          | Developer Contact |
        </Link>
      </p>
    </div>
  );
};

export default Footer;
