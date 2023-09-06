import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UsersMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../components/context/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  //get user data
  useEffect(() => {
    const { name, email, address, phone } = auth?.user;
    setDetails({ name, email, address, phone });
  }, [auth?.user]);

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
      const { data } = await axios.put("/api/v2/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.data = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        navigate("/dashboard/user");
      }
    } catch (error) {
      //   console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="container-fluid">
        <div className="row p-4">
          <div className="col-md-3 mb-2">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <div>
              <div className="register">
                <form onSubmit={handleSubmit}>
                  <h1>User Profile</h1>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      value={details.name}
                      className="form-control"
                      placeholder="Enter your name"
                      onChange={handleChange}
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
                      disabled
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
                      style={{ maxHeight: "3rem" }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
