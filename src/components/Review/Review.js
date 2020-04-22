import React, { useEffect } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import { useState } from "react";
import "./Review.css";
import Cart from "../Cart/Cart";
import Shop from "../Shop/Shop";
import { Link } from "react-router-dom";
import thankyouImg from "../../images/giphy.gif";
import { auth } from "firebase";
import { useAuth } from "../LogIn/useAuth";

const Review = () => {
  const [cart, setCart] = useState([]);
  //console.log(cart)
  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((product) => product.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
    //console.log("removed", productKey);
  };
  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => key === pd.key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  const auth = useAuth();
  const [placeOrder, setPlaceOrder] = useState(false);
  // const handlePlaceOrder = () => {
  //   setCart([]);
  //   setPlaceOrder(true);
  //   processOrder();
  // };

  let thankyou;
  if (placeOrder) {
    thankyou = <img src={thankyouImg} alt="" />;
  }

  return (
    <div className="review">
      <div className="product-container ">
        {cart.map((product) => (
          <div className="cartItem">
            <h3>{product.name}</h3>
            <img src={product.img} alt="" />
            <br />
            <p>${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>
              <small>Only {product.stock} left in stock - Order soon</small>
            </p>

            {
              <button
                className="main-button"
                onClick={() => handleRemoveProduct(product.key)}
              >
                Remove
              </button>
            }
          </div>
        ))}

        {
          thankyou
        }
        {
          !cart.length && <h1>Your cart is empty. <a style={{ textDecoration: "none" }} href="/shop">Keep shopping</a></h1>
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/shipment">
            {
              auth.user ? <button className="main-button">Proceed CheckOut</button> :
                <button className="main-button">LogIn to Proceed</button>
            }
          </Link>
        </Cart>
      </div>
    </div>
  );
};
export default Review;
