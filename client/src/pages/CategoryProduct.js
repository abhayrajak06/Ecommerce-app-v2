import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v2/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={""}>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>
        <div className="d-flex flex-wrap gap-4">
          {products?.map((p) => (
            <div key={p._id} className="card" style={{ width: "15rem" }}>
              <img
                src={`/api/v2/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text"> ₹ {p.price}</p>
                <button
                  className="btn btn-primary m-1"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => {
                    navigate(`/product-details/${p.slug}`);
                  }}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary m-1"
                  style={{ fontSize: "0.7rem" }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
