import React from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";

const Pagenotfound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="pagenotfound">
        <h1 style={{ fontSize: "8rem" }}>404</h1>
        <h3>Oops ! Page Not Found</h3>
        <Link onClick={() => navigate(-1)}>Go Back</Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
