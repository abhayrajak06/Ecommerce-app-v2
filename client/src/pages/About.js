import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row p-5">
          <div className="col-md-6">
            <img src="/assets/about.jpeg" alt="" className="w-100" />
          </div>
          <div className="col-md-4 mt-4">
            <h1 className="text-center text-light bg-dark p-2">About</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              soluta laboriosam velit harum suscipit quisquam amet a odit ipsa,
              delectus nostrum esse aliquam in, quis perspiciatis excepturi est?
              Repellat, nesciunt?
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
