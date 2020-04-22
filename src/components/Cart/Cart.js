import React from "react";
import "./Cart.css";

const Cart = (props) => {


  let productPrice = 0;
  let total = 0;
  for (let i = 0; i < props.cart.length; i++) {
    let price = props.cart[i].price;
    productPrice = productPrice + price * props.cart[i].quantity;
    total = total + productPrice;
  }

  let Shipping = 0;
  if (total > 0 && total < 50) {
    Shipping = 30.99;
  } else if (total >= 50 && total < 500) {
    Shipping = 20.99;
  } else if (total > 500) {
    Shipping = 10.99;
  }

  let vat = (total * 5) / 100;
  let grandTotal = total + vat + Shipping;

  function formateNumber(num) {
    return num.toFixed(2);
  }

  return (
    <div className="cart">
      <h2>Order summary</h2>
      <table>
        <tr>
          <td>Items ordered:</td>
          <td>
            <span>
              <strong>{props.cart.length}</strong>
            </span>
          </td>
        </tr>
        <tr>
          <td>product price:</td>
          <td>
            <span>${formateNumber(productPrice)}</span>
          </td>
        </tr>
        <tr>
          <td>Shipping cost:</td>
          <td>
            <span>${Shipping}</span>
          </td>
        </tr>
        <tr>
          <td> Vat + Tax:</td>
          <td>
            <span>${formateNumber(vat)}</span>
          </td>
        </tr>
        <tr>
          <td> Total:</td>
          <td>
            <span>${formateNumber(grandTotal)}</span>
          </td>
        </tr>
        <br />
      </table>
      {props.children}

    </div>
  );
};

export default Cart;
