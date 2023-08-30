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
          <div className="col-md-12 d-flex justify-content-center mt-3 mb-2 gap-4 flex-wrap">
            {categories?.map((c) => (
              <Link
                key={c._id}
                to={`/category/${c.slug}`}
                className="btn btn-warning  p-3"
                style={{ width: "18rem" }}
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
