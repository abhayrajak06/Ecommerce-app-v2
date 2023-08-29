import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v2/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v2/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Product Details - Ecommerce App"}>
      <div className="container-fluid">
        <div className="row mt-3 mb-2">
          <div className="col-md-5">
            <img
              src={`/api/v2/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              width={"100px"}
              height={"340px"}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Product Details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>Price : {product.price}</h6>
            <h6>Category : {product?.category?.name}</h6>
            <button className="btn btn-secondary ms-1">ADD TO CART</button>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center">
          <div className="col-md-10 mb-3">
            <h5>Similar Products</h5>
            {relatedProducts && relatedProducts.length < 1 && (
              <h5 className="text-center">No related products found</h5>
            )}
            {/* {JSON.stringify(relatedProducts, null, 4)} */}
            <div className="d-flex flex-wrap gap-2">
              {relatedProducts?.map((p) => (
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
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
