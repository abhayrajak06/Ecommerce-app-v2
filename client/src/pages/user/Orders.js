import React from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UsersMenu";

const Orders = () => {
  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid">
        <div className="row p-4">
          <div className="col-md-3 mb-2">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <h1>Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
