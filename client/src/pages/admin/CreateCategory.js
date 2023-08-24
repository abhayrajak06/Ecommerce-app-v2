import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  //get all categories
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(`/api/v2/category/get-category`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v2/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid">
        <div className="row p-4">
          <div className="col-md-3 mb-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="mb-3 w-75 p-1">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="w-75">
              <div className="" style={{ height: "20rem", overflow: "scroll" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2 mb-1">
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
