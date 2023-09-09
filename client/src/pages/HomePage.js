import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/cart";
import toast from "react-hot-toast";
import SearchInput from "../components/Form/SearchInput";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v2/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //get all categories
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(`/api/v2/category/get-category`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v2/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length <= 0 || radio.length <= 0) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) filterProduct();
  }, [checked, radio]);

  //loadmore
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v2/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);

  //filter by categories
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v2/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //add to cart
  const addToCart = (product, quantity) => {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.product._id === product._id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If the product is not in the cart, add it
      const updatedCart = [...cart, { product, quantity }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <Layout title={"Best offerce - shop now"}>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-12 d-flex justify-content-center align-items-center"
            style={{
              backgroundImage: `url('/assets/bannerImg.jpg')`, // Replace with the path to your image
              backgroundSize: "cover", // You can adjust this property to control how the image is displayed
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "22rem",
              width: "100%",
              boxShadow: "0 5px 20px rgba(5, 1, 9, 0.7)",
              transition: "transform 0.2s ease-in-out",
              borderRadius: "0 0 1.6rem 1.6rem",

              // You can also set other background properties like background-color here if needed
            }}
          >
            <SearchInput />
          </div>
        </div>
        <div className="row p-3 d-flex justify-content-between">
          <div className="col-md-2 mt-2">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-3">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-danger w-75"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-10">
            {/* {JSON.stringify(checked, null, 4)}
            {JSON.stringify(radio, null, 4)} */}
            <h1 className="text-center">All Products</h1>
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
                        navigate(`product-details/${p.slug}`);
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary m-1"
                      style={{ fontSize: "0.7rem" }}
                      onClick={() => {
                        // setCart([...cart, p]);
                        // localStorage.setItem(
                        //   "cart",
                        //   JSON.stringify([...cart, p])
                        // );
                        addToCart(p, 1);
                        toast.success("Item added to Cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length > 0 && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
