import React from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact us -Ecommerce App"}>
      <div className="container-fluid contactus">
        <div className="row p-5">
          <div className="col-md-6">
            <img src="/assets/contactus.jpeg" alt="" className="w-100" />
          </div>
          <div className="col-md-4 mt-4">
            <h2 className="text-center bg-dark text-light p-2">Contact Us</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores voluptatem quia nulla odio, assumenda dicta tempore
              quae. Cumque, porro veritatis?
            </p>
            <p>✉️ : mail@mail.com</p>
            <p>📞 : 8484848481</p>
            <p>💁🏻‍♂️ : (0300300) toll free</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
