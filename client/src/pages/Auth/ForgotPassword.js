import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../components/context/auth";

const ForgotPassword = () => {
  const [details, setDetails] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const value = e.target.value;
    setDetails({ ...details, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = details.email;
      const newPassword = details.newPassword;
      const answer = details.answer;

      const res = await axios.post("/api/v2/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res?.data.message);
        setAuth({
          ...auth,
          user: res?.data.user,
          token: "",
        });
        localStorage.removeItem("auth");
        navigate("/login");
      }
    } catch (error) {
      //   console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={"Forgot Password - Ecommerce App"}>
      <div>
        <div className="register" style={{ height: "68.2vh" }}>
          <form onSubmit={handleSubmit}>
            <h1 style={{ fontSize: "1.5rem" }}>Reset Password</h1>
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
                type="text"
                name="answer"
                value={details.answer}
                className="form-control"
                placeholder="Your favourite sports ?"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="newPassword"
                value={details.password}
                className="form-control"
                placeholder="Enter new password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
