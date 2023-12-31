import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    answer: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const value = e.target.value;
    setDetails({ ...details, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = details.name;
      const email = details.email;
      const password = details.password;
      const phone = details.phone;
      const address = details.address;
      const answer = details.answer;
      const res = await axios.post("/api/v2/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success("Registerd Successfully");
        navigate("/login");
      }
    } catch (error) {
      //   console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={"Register - Ecommerce App"}>
      <div>
        <div className="register">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={details.name}
                className="form-control"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={details.email}
                className="form-control"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={details.password}
                className="form-control"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="phone"
                value={details.phone}
                className="form-control"
                placeholder="Enter phone number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                name="address"
                value={details.address}
                className="form-control"
                placeholder="Enter your address"
                onChange={handleChange}
                required
                style={{ maxHeight: "3rem" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="answer"
                value={details.answer}
                className="form-control"
                placeholder="Your favourite sports ?"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <p className="mt-1" style={{ fontSize: "0.85rem" }}>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
