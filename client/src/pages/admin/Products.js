import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v2/product/get-products");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Dashboard - Products">
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3 mb-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap gap-3">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/products/${p.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div className="card" style={{ width: "15rem" }}>
                    <img
                      src={`/api/v2/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
