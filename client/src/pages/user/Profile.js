import React from "react";
import Layout from "../../components/Layout/Layout";
import UsersMenu from "../../components/Layout/UsersMenu";

const Profile = () => {
  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="container-fluid">
        <div className="row p-4">
          <div className="col-md-3 mb-2">
            <UsersMenu />
          </div>
          <div className="col-md-9">
            <h1>User Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
