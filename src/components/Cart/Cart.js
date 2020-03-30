import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const Cart = (props) => {

    
    let total = 0;
    for(let i = 0; i<props.cart.length; i++){
        let price = props.cart[i].price;
        total = total + price;
    }
    
    
    let Shipping = 0;
    if(total>0 && total<50){
        Shipping = 30.99;
    }else if(total>= 50 && total < 500){
        Shipping = 20.99;
    }else if(total> 500){
        Shipping = 10.99;
    }

    let productPrice = 0;
    for(let i = 0; i<props.cart.length; i++){
        let price = props.cart[i].price;
        productPrice = productPrice + price;
    }
   

    let vat = (total * 5) / 100;
    let grandTotal = total + vat + Shipping;

    function formateNumber(num){
        return num.toFixed(2);
    }
    
   
    return (
        <div className="cart">
            <h2>Order summary</h2>
            <p>Items ordered: <strong>{props.cart.length}</strong></p>
            <p>Product price: <span> ${formateNumber(productPrice)}</span></p>
            <p>Shipping cost: <span>${Shipping}</span></p>
            <p>VAT: <span>${formateNumber(vat)}</span></p>
            <p>Total: <span>${formateNumber(grandTotal)}</span></p>
            <button className="review-order-btn"><FontAwesomeIcon icon={faShoppingBag} /> Review orders</button>

            
        </div>
    );
};

export default Cart;