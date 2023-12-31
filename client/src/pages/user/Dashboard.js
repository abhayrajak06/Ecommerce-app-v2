import React from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UsersMenu";
import { useAuth } from "../../components/context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid">
        <div className="row p-4">
          <div className="col-md-3 mb-2">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <div className="card details w-75  p-3">
              <h3>{auth?.user.name}</h3>
              <h3> {auth?.user.email}</h3>
              <h3>{auth?.user.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
