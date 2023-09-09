import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../components/context/auth";
import { useCart } from "../components/context/cart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  // const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const handleQuantityMore = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product.product._id
    );

    if (productIndex !== -1) {
      // Increase the quantity of the product in the cart
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const handleQuantityLess = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product.product._id
    );

    if (productIndex !== -1) {
      // Increase the quantity of the product in the cart
      if (updatedCart[productIndex].quantity > 1) {
        updatedCart[productIndex].quantity -= 1;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.product.price * item.quantity;
        return total;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "inr",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      // let myCart = [...cart];
      // let index = myCart.findIndex((item) => item._id === pid);
      // myCart.splice(index, 1);
      // setCart(myCart);
      // localStorage.setItem("cart", JSON.stringify(myCart));
      const updatedCart = cart.filter((item) => item.product._id !== pid);

      // Update the state with the new cart
      setCart(updatedCart);

      // Update localStorage with the new cart
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Your Cart - Ecommerce App"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart?.length} items in your cart ${
                    auth?.token ? "" : "Please Login to Checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div
                key={p.product._id}
                className="row card flex-row mb-2 p-2"
                // style={{ width: "40rem", height: "10rem" }}
              >
                <div className="col-md-4">
                  <img
                    src={`/api/v2/product/product-photo/${p.product._id}`}
                    className="card-img"
                    alt={p.name}
                    width={"140rem"}
                    height={"140rem"}
                    // style={{ backgroundSize: "contain" }}
                  />
                </div>
                <div className="col-md-4">
                  <p>{p.product.name}</p>
                  {/* {JSON.stringify(p, null, 4)} */}
                  <p>{p.product.description.substring(0, 30)}</p>
                  <p>Price : {p.product.price * p.quantity}</p>
                </div>
                <div className="col-md-4 d-flex flex-column justify-content-center ">
                  <div className="mb-3">
                    <button
                      className="p-1"
                      style={{
                        width: "1.4rem",
                        backgroundColor: "rgba(69, 61, 65, 0.8)",
                        color: "white",
                        borderRadius: "20%",
                      }}
                      onClick={() => handleQuantityLess(p)}
                    >
                      -
                    </button>
                    <span
                      style={{
                        borderRadius: "20%",
                        backgroundColor: "rgba(226, 212, 219, 0.8)",
                      }}
                      className="m-1"
                    >
                      {p.quantity}
                    </span>
                    <button
                      className="p-1"
                      style={{
                        width: "1.4rem",
                        backgroundColor: "rgba(69, 61, 65, 0.8)",
                        color: "white",
                        borderRadius: "20%",
                      }}
                      // onClick={handleQuantityMore(p)}
                      onClick={() => handleQuantityMore(p)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger w-75"
                    onClick={() => removeCartItem(p.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
