import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row  p-5">
          <div className="col-md-6 mt-5">
            <img src="/assets/about.jpeg" alt="" className="w-100" />
          </div>
          <div className="col-md-4 mt-5">
            <h1 className="text-center text-light bg-dark">About</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
              at voluptate consectetur rerum error totam doloremque et eos
              blanditiis quia officia alias officiis asperiores, ea quasi ipsa
              repellat, dolor incidunt.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
