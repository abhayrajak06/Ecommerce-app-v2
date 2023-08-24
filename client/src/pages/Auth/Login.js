import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../components/context/auth";

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e) => {
    const value = e.target.value;
    setDetails({ ...details, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = details.email;
      const password = details.password;
      const res = await axios.post("/api/v2/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success("Login Successfully");
        setAuth({
          ...auth,
          user: res?.data.user,
          token: res?.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res?.data));
        navigate(location.state || "/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={"Register - Ecommerce App"}>
      <div>
        <div className="register" style={{ minHeight: "70vh" }}>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-2 d-flex flex-column align-items-center">
              <button type="submit" className="btn btn-primary mb-1 w-100">
                Login
              </button>
              <button className="btn btn-primary w-100">
                <Link
                  to={"/forgot-password"}
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Forgot Password
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
