import React from "react";
import Layout from "../components/Layout/Layout";

const Developer = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row developer mt-5 p-5">
          <div className="col-md-5 mb-2">
            <img
              src="/assets/avatar.jpg"
              className="w-75"
              style={{ borderRadius: "100%" }}
              alt=""
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center bg-dark text-light p-2">
              Developer Contact
            </h1>
            <h4>Computer Science Engineer</h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
              laboriosam totam exercitationem. A corrupti error natus quis
              ratione consequuntur reiciendis sequi quo dolores odio culpa,
              officiis minima qui accusantium excepturi!
            </p>
            <p>
              ✉️ :{" "}
              <a
                href="mailto:mail2rajab01@gmail.com"
                style={{ textDecoration: "none", color: "black" }}
              >
                mail2rajab01@gmail.com
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Developer;
