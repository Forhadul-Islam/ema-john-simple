import React from "react";
import "./Shop.css";
import fakeData from "../../fakeData";
import { useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Shop = () => {
  const firstThirty = fakeData.slice(0, 30);
  const [products, setProducts] = useState(firstThirty);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    const cartProducts = productKey.map((key) => {
      const product = fakeData.find((product) => product.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  const handleAddProduct = (product) => {
    const toAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toAddedKey);
    const others = cart.filter((pd) => pd.key !== toAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      product.quantity = product.quantity + 1;
      count = product.quantity;
      newCart = [...others, sameProduct];
      setCart(newCart);
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
      setCart(newCart);
    }
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">
              <FontAwesomeIcon icon={faShoppingBag} /> Review orders
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
