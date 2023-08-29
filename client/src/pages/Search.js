import React from "react";
import { useSearch } from "../components/context/search";
import Layout from "../components/Layout/Layout";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title="Search results">
      <div className="container">
        <div className="text-center mt-2">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
        </div>
        <div className="d-flex flex-wrap gap-4 mb-3 mt-1">
          {values?.results.map((p) => (
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

export default Search;
