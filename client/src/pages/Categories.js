import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hook/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories - Ecommerce App"}>
      <div className="container">
        <div className="row justify-content-center">
          <h3 className="text-center mt-2">All Categories</h3>
          <div className="col-md-10 d-flex justify-content-center mt-3 mb-2 gap-4">
            {categories?.map((c) => (
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-warning w-50 p-3"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
