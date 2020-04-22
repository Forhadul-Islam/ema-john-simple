import React from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";

const ProductDetail = () => {
  const { productKey } = useParams();
  const product = fakeData.find(product => product.key === productKey);
  console.log(product);
  return (
    <div>
      <Product product={product} showAddToCart={false}></Product>
    </div>
  );
};

export default ProductDetail;
